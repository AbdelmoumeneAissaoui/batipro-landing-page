"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { brandConfig } from "@/app/config/brand";
import { Product } from "@/lib/types";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const router = useRouter();

  const initialProducts = useMemo<Product[]>(() => {
    return brandConfig.i18n.fr.featuredProducts.map((product) => ({ ...product }));
  }, []);

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    badge: "",
    rating: "5",
    image: "",
    categoryId: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/products");
        if (response.status === 401) {
          setAuthenticated(false);
          setIsLoading(false);
          return;
        }
        if (response.ok) {
          setAuthenticated(true);
          const data = await response.json();
          setProducts(data);
        }
      } catch {
        setAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      setAuthenticated(true);
      setUsername("");
      setPassword("");

      const productsResponse = await fetch("/api/admin/products");
      if (productsResponse.ok) {
        const data = await productsResponse.json();
        setProducts(data);
      }
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setAuthenticated(false);
      setUsername("");
      setPassword("");
      setValidationError("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Tous les champs sont requis.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors du changement de mot de passe.");
      }

      setPasswordSuccess("Mot de passe changé avec succès!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess("");
      }, 2000);
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: "", price: "", badge: "", rating: "5", image: "", categoryId: "" });
    setSelectedFile(null);
    setValidationError("");
  };

  const editProduct = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      badge: product.badge ?? "",
      rating: String(product.rating ?? 0),
      image: product.image,
      categoryId: product.categoryId ? String(product.categoryId) : "",
    });
    setSelectedFile(null);
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Supprimer ce produit ?")) return;

    try {
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting product");
      }

      setProducts((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error(error);
      setValidationError("Impossible de supprimer le produit.");
    }
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.price.trim() || !formData.image.trim()) {
      setValidationError("Le nom, le prix et l'image sont requis.");
      return false;
    }

    const rating = Number(formData.rating);
    if (Number.isNaN(rating) || rating < 0 || rating > 5) {
      setValidationError("Note invalide (0 à 5).");
      return false;
    }

    if (!formData.categoryId) {
      setValidationError("Veuillez sélectionner une catégorie.");
      return false;
    }

    setValidationError("");
    return true;
  };

  const handleSubmitProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      let imageUrl = formData.image.trim();

      if (selectedFile) {
        const reader = new FileReader();
        const dataUrl: string = await new Promise((resolve, reject) => {
          reader.onload = () => (typeof reader.result === "string" ? resolve(reader.result) : reject("Invalid file result"));
          reader.onerror = () => reject("Failed to read file");
          reader.readAsDataURL(selectedFile);
        });

        const safeFileName = `${Date.now()}-${selectedFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        const uploadResp = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: safeFileName, dataUrl }),
        });

        if (!uploadResp.ok) {
          throw new Error("Échec de l'upload de l'image.");
        }

        const uploadData = await uploadResp.json();
        imageUrl = uploadData.url;
      }

      const payload = {
        name: formData.name.trim(),
        price: formData.price.trim(),
        badge: formData.badge.trim() || null,
        rating: Number(formData.rating),
        image: imageUrl,
        categoryId: Number(formData.categoryId),
      };

      const method = editingId !== null ? "PUT" : "POST";
      const postUrl = "/api/admin/products";
      const body = editingId !== null ? { id: editingId, ...payload } : payload;

      const response = await fetch(postUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur de sauvegarde du produit.");
      }

      const savedProduct = await response.json();
      if (editingId !== null) {
        setProducts((prev) => prev.map((item) => (item.id === editingId ? savedProduct : item)));
      } else {
        setProducts((prev) => [...prev, savedProduct]);
      }

      resetForm();
    } catch (error) {
      console.error(error);
      setValidationError("Impossible de sauvegarder le produit.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Chargement...</p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-md bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Administration Produits</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Identifiant
              </label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            {validationError && <p className="text-red-600 text-sm">{validationError}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:bg-gray-400"
            >
              Se connecter
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-500">
            Identifiant par défaut : <strong>admin</strong>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard Admin - Produits</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="rounded-lg bg-orange-600 text-white px-4 py-2 hover:bg-orange-700"
            >
              Changer le mot de passe
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-200"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <h2 className="text-2xl font-bold mb-4">Changer le mot de passe</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                    Mot de passe actuel
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    Nouveau mot de passe (min 8 caractères)
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}
                {passwordSuccess && <p className="text-green-600 text-sm">{passwordSuccess}</p>}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
                  >
                    Changer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                      setPasswordError("");
                      setPasswordSuccess("");
                    }}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="mb-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId !== null ? "Modifier un produit" : "Ajouter un produit"}
          </h2>
          <form onSubmit={handleSubmitProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Nom du produit"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                placeholder="Prix (ex 129.99€)"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData((prev) => ({ ...prev, categoryId: e.target.value }))}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Sélectionner une catégorie</option>
                {brandConfig.i18n.fr.categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <input
                placeholder="Badge (ex Promo)"
                value={formData.badge}
                onChange={(e) => setFormData((prev) => ({ ...prev, badge: e.target.value }))}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="Note (0-5)"
                value={formData.rating}
                onChange={(e) => setFormData((prev) => ({ ...prev, rating: e.target.value }))}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 md:col-span-2"
              />
              <input
                placeholder="URL image (optionnel si image upload)"
                value={formData.image}
                onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                className="w-full border border-gray-300 rounded px-3 py-2 md:col-span-2"
              />
            </div>
            {validationError && <p className="text-red-600">{validationError}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
              >
                {editingId !== null ? "Mettre à jour" : "Ajouter"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
              >
                Annuler
              </button>
            </div>
          </form>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Liste des produits</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Nom</th>
                  <th className="px-4 py-2 border">Catégorie</th>
                  <th className="px-4 py-2 border">Prix</th>
                  <th className="px-4 py-2 border">Badge</th>
                  <th className="px-4 py-2 border">Note</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 border">{product.id}</td>
                    <td className="px-4 py-2 border">{product.name}</td>
                    <td className="px-4 py-2 border">
                      {brandConfig.i18n.fr.categories.find((cat) => cat.id === product.categoryId)?.label || "-"}
                    </td>
                    <td className="px-4 py-2 border">{product.price}</td>
                    <td className="px-4 py-2 border">{product.badge ?? "-"}</td>
                    <td className="px-4 py-2 border">{product.rating}</td>
                    <td className="px-4 py-2 border">
                      <a href={product.image} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                        Voir
                      </a>
                    </td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        onClick={() => editProduct(product)}
                        className="rounded px-3 py-1 bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="rounded px-3 py-1 bg-red-500 text-white hover:bg-red-600"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                      Aucun produit trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
