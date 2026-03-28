'use client';
import { Phone } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import Image from 'next/image';
import { TeamMember } from '@/lib/types';
import { SectionTitle, Button } from './ui';

export default function TeamSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>
          {t.ui.teamTitle}
        </SectionTitle>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto mb-16">
          {t.ui.teamSubtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image 
                  src={member.avatar} 
                  alt={`Photo de ${member.firstName} ${member.lastName}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-full border-4 border-gray-50 shadow-sm"
                />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-dark)] mb-1">
                {member.firstName} {member.lastName}
              </h3>
              <p className="text-[var(--color-primary)] font-medium mb-6">{member.role}</p>
              
              <a 
                href={`tel:${member.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-50 hover:bg-[var(--color-primary)] text-[var(--color-dark)] hover:text-white rounded-xl transition-colors font-medium border border-gray-100 hover:border-transparent"
                dir="ltr"
              >
                <Phone size={18} />
                {member.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
