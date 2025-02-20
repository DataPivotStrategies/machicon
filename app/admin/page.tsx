import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to admin/events page
  redirect('/admin/events');
}