import Image from "next/image";

import SectionHeader from "../components/SectionHeader";
import SubmissionForm from "../components/auth/Submission";
import Footer from "../components/HomePage/Footer";
export default function page() {
    return (
      <div className='py-2'>
        
        <div className="py-6">
          
          <SectionHeader 
  title="ENROLLMENT APPLICATION"
  heading=" Begin Your Educational Journey"
  description="Complete this form to start your personalized learning experience with ijtahed Academic Center. 
    Our admissions team will contact you within 24 business hours to discuss your educational goals.."
/>




</div>


<SubmissionForm/>
<Footer/>
        
      </div>
    )
  }
  
  