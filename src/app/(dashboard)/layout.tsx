import Menu from "../components/dashboard/Menu";
import Navbar from "../components/dashboard/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    
        <div className="h-screen flex">

            {/*LEFT*/}
    
        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-2 ">
        <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
        <Image src="/logo.png" alt="logo" width={75} height={50}/>
        <span className="hidden lg:block text-m font-serif text-black">ijtahed Academic Center</span>
        
        </Link>
        <Menu/>
        
        </div>


        {/*RIGHT*/}
        
    
    
        
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fd] overflow-scroll flex flex-col">
          <Navbar/>

          {children}
          
        
        
        </div>
    
    
    
      </div>
      );
        
    
    }