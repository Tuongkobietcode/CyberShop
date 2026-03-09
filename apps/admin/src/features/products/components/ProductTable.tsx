import MetaSection from "./ProductForm/MetaSection";
import BasicDetailsSection from "./ProductForm/BasicDetailsSection";
import PricingSection from "./ProductForm/PricingSection";
import InventorySection from "./ProductForm/InventorySection";
import UploadImagesSection from "./ProductForm/UploadImagesSection";
import ProductForm from "./ProductForm/ProductForm";

const ProductTable = () => {
  return (
    <div className="flex flex-col">
      <MetaSection></MetaSection>
      <div className="flex flex-row">
        <div className="mx-5 mb-5 bg-white rounded-2xl w-1/2 shadow-sm border border-gray-100">
          <BasicDetailsSection></BasicDetailsSection>
          <PricingSection></PricingSection>
          <InventorySection></InventorySection>
        </div>
        <div className="mr-5 mb-5 bg-white rounded-2xl w-1/2 h-2/3 shadow-sm border border-gray-100">
          <UploadImagesSection></UploadImagesSection>
          <ProductForm></ProductForm>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
