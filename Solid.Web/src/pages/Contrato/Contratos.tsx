import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const Contratos = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Contratos" />
      <div className="flex flex-col gap-10 overflow-y-auto">
      </div>
    </DefaultLayout>
  );
};

export default Contratos;
