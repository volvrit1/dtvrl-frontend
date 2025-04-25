import LandTypeForm from "../crud/forms/LandType";
import UserTypeForm from "../crud/forms/UserType";
import CropTypeForm from "../crud/forms/CropType";
import AgentTypeForm from "../crud/forms/AgentType";
import BannerTypeForm from "../crud/forms/BannerType";
import ServiceTypeForm from "../crud/forms/ServiceType";
import ConfirmationModal from "../crud/ConfirmationModal";
import EquipmentTypeForm from "../crud/forms/EquipmentType";
import BookingDetailsForm from "../crud/forms/BookingDetails";
import TestimonialTypeForm from "../crud/forms/TestimonialType";
import EquipmentListingForm from "../crud/forms/EquipmentListing";

interface FormRendererProps {
  data: any;
  onClose?: any;
  formType: string;
  setPaginate?: any;
  setFilteredData?: any;
}

const FormRenderer: React.FC<FormRendererProps> = (props: any) => {
  switch (props.formType) {
    case "Delete":
      return <ConfirmationModal {...props} />;
    case "Equipment Type":
      return <EquipmentTypeForm {...props} />;
    case "Service":
      return <ServiceTypeForm {...props} />;
    case "Equipment":
      return <EquipmentListingForm {...props} />;
    case "Agent":
      return <AgentTypeForm {...props} />;
    case "Booking":
      return <BookingDetailsForm {...props} />;
    case "Crop":
      return <CropTypeForm {...props} />;
    case "Banner":
      return <BannerTypeForm {...props} />;
    case "Blog":
      return <AgentTypeForm {...props} />;
    case "FAQ":
      return <AgentTypeForm {...props} />;
    case "Land":
      return <LandTypeForm {...props} />;
    case "Testimonial":
      return <TestimonialTypeForm {...props} />;
    case "User":
      return <UserTypeForm {...props} />;
    default:
      return <div>No Form Exist</div>;
  }
};

export default FormRenderer;
