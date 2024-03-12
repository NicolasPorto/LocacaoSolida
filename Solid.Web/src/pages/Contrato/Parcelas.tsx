import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const Parcelas = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Parcelas" />
      <div className="flex flex-col gap-10 overflow-y-auto">
      </div>
    </DefaultLayout>
  );
};

export default Parcelas;
