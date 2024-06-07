import { WorkLayout } from '~/layouts/WorkLayout/WorkLayout';

interface MockPageProps {
  title: string;
}

export function MockPage({ title }: MockPageProps) {
  return <WorkLayout>{title}</WorkLayout>;
}
