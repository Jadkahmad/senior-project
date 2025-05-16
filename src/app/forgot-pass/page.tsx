import ForgotPassword from "../components/auth/ForgotPass";
import CustomCarousel from "../components/auth/CustomCarousel";
export default function ForgotPasswordPage() {
  return (
      <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative ">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="absolute top-5 left-5"> <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        ijtahed 
      </span>
      <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-300 italic">
        Your Partner in Education
      </span></div>
            <div className="grid gap-2 text-center mt-10 md:mt-0">
              <h1 className="text-3xl font-bold">Recover Your Account</h1>
            </div>
            <ForgotPassword/>
            
          </div>
        </div>
        <div className="hidden bg-muted lg:block relative">
          <CustomCarousel />
        </div>
      </div>
    );
}