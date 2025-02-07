"use client";

import Link from "next/link";

export function AboutSection () {

    return (
        <div>
            <h3 className="text-xl font-semibold">A propos</h3>
            <p>
                Vous pouvez consulter les informations légales de MedTree <Link href="/about" className="underline">ici</Link>.
            </p>
        </div>
    );
}