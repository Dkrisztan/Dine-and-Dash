import { Header } from '@/app/about/Header';
import { DataTableDemo } from '@/components/DataTableDemo';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function About() {
  return (
    <>
      <Header />
      <div className='p-10'>
        <ModeToggle />
        <DataTableDemo />
      </div>
    </>
  );
}
