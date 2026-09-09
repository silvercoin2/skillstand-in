import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RoleDetail } from "@/components/careers/RoleDetail";
import { getCareerRole, getCareerRolePath, getCareerRoles } from "@/data/careers";
import { buildMetadata } from "@/lib/seo";

type CareerRoleParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getCareerRoles().map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: { params: CareerRoleParams }): Promise<Metadata> {
  const { slug } = await params;
  const role = getCareerRole(slug);
  if (!role) {
    return buildMetadata({
      title: "Role not found",
      description: "This career listing is no longer available.",
      path: getCareerRolePath(slug),
      noIndex: true,
    });
  }

  return buildMetadata({
    title: role.title,
    description: role.shortDescription,
    path: getCareerRolePath(role.slug),
  });
}

export default async function CareerRolePage({ params }: { params: CareerRoleParams }) {
  const { slug } = await params;
  const role = getCareerRole(slug);
  if (!role) notFound();

  const related = getCareerRoles()
    .filter((item) => item.category === role.category && item.slug !== role.slug)
    .slice(0, 4);

  return <RoleDetail role={role} related={related} />;
}
