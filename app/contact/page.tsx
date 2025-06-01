
'use client';
import Navbar from '@/component/navbar';
import Footer from '@/component/Footer';
import React from 'react';

const contactInfo = [
    {
        label: 'Email',
        value: 'Andro**group@gmail.com',
        link: 'Androtechlistgroup@gmail.com',
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v16H4z" stroke="none" />
                <path d="M4 4l8 8 8-8" />
            </svg>
        ),
    },
    {
        label: 'Phone',
        value: '+(234)8166382563',
        link: 'tel:+(234)8166382563',
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72a2 2 0 0 1 1.72 2z" />
            </svg>
        ),
    },
    {
        label: 'Address',
        value: `Baptist High School Uwani
73-81 Robinson St, Uwani, Enugu 400105, Enugu`,
        link: 'https://maps.app.goo.gl/XMkztJKufZ7JhEE98',
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
            </svg>
        ),
    },
];

const socialLinks = [
    {
        label: 'Facebook',
        url: 'https://facebook.com/bhs24hub',
        icon: (
            <svg width="24" height="24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99h-2.54V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56V12h2.74l-.44 2.89h-2.3v6.99C18.34 21.13 22 17 22 12z" />
            </svg>
        ),
    },
    {
        label: 'Instagram',
        url: 'https://instagram.com/bhs24hub',
        icon: (
            <svg width="24" height="24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" fill="none" stroke="#fff" strokeWidth="2" />
                <circle cx="17" cy="7" r="1.5" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        url: 'https://linkedin.com/company/bhs24hub',
        icon: (
            <svg width="24" height="24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <rect x="6" y="9" width="3" height="9" />
                <rect x="10.5" y="13" width="3" height="5" />
                <circle cx="7.5" cy="7" r="1.5" />
                <rect x="14.5" y="9" width="3" height="9" />
            </svg>
        ),
    },
];

export default function ContactPage() {
    return (
        <>
            <Navbar />
          
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col items-center py-10 px-4">
            <section className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col gap-8">
                <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-2">Contact Us</h1>
                <p className="text-gray-600 mb-6">
                    Reach out to us for any queries, suggestions, or support. We’re here to help!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-6">
                        {contactInfo.map((info) => (
                            <a
                                key={info.label}
                                href={info.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-lg hover:bg-indigo-50 transition"
                            >
                                <span className="text-emerald-700">{info.icon}</span>
                                <div>
                                    <div className="text-sm text-gray-500">{info.label}</div>
                                    <div className="text-lg font-medium text-gray-800">{info.value}</div>
                                </div>
                            </a>
                        ))}
                        <div className="flex gap-4 mt-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 transition"
                                    aria-label={social.label}
                                >
                                    <span className="w-6 h-6 text-emerald-700">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
                        <iframe
                            title="BHS24HUB Location"
                            src="https://maps.app.goo.gl/XMkztJKufZ7JhEE98"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>
        </main>
          <Footer />
        </>
    );
}