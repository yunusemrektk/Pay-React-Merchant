import LoadingModal from "../../components/modals/LoadingModal";
import CategoryMenuSettings from "../../components/organism/settings/CategoryMenuSettings";
import { useMerchantCategories } from "../../hooks/useMerchantCategories";
import { useMerchantMenu } from "../../hooks/useMerchantMenu";

export default function CategoriesSettings() {
  const merchantId = "merc1"
  const { menu, isLoading: menuLoading, saveOrder: saveMenuOrder } = useMerchantMenu(merchantId)
  const { categories, isLoading: catLoading, saveCategory: saveCategory } = useMerchantCategories(merchantId)

  if (menuLoading || catLoading) return <LoadingModal open description="Yükleniyor…" />

  return <CategoryMenuSettings
    hostMenu={menu}
    hostCategories={categories}
  />;
}