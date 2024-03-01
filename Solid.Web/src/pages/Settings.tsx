import { useEffect, useState, useContext } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UserOne from '../images/user/user.png';
import DefaultLayout from '../layout/DefaultLayout';

import { CorretorContext } from '../context/CorretorContext';
import { salvarImagem } from '../services/corretorApi';

const Settings = () => {
  const [imagem, setImagem] = useState(null);
  const [error, setError] = useState('');
  const [sucesso, setSucesso] = useState('');
  const { imagemTratada, obterImagemPerfil } = useContext(CorretorContext)

  const handleImagemChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file)
    setImagem(file);
    limparMensagens()
  };

  const removerImagem = () => {
    setImagem(null);
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (imagem) {
        const formData = new FormData();
        formData.append('file', imagem);
        await salvarImagem(formData);
        setSucesso('Imagem salva com sucesso!')
        setError('')
        removerImagem()
        await obterImagemPerfil()
      } else {
        setSucesso('')
        setError('Nenhuma imagem selecionada.');
      }
    } catch (error) {
      setError('Erro ao enviar imagem.');
    }
  };

  const apagarImagemPerfil = async (event: any) => {
    event.preventDefault();
    try {
        const formData = new FormData();
        const userOneFile = await fetch(UserOne).then(res => res.blob()); 
        const userOneImageFile = new File([userOneFile], 'UserOne.png', { type: 'image/png' });
        formData.append('file', userOneImageFile);
        await salvarImagem(formData);
        setSucesso('Imagem apagada com sucesso!');
        setError('');
        removerImagem();
        await obterImagemPerfil();
    } catch (error) {
      setError('Erro ao apagar imagem.');
    }
};

  useEffect(() => {
    setSucesso('')
    setError('')
  }, [])

  const limparMensagens = () => {
    setSucesso('')
    setError('')
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Configurações" />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Sua foto
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      {imagemTratada ? <img src={imagemTratada} alt="User" className="rounded-full" /> : <img src={UserOne} alt="User" className="rounded-full" />}
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Editar sua foto
                      </span>
                      <span className="flex gap-2.5">
                        <button onClick={apagarImagemPerfil} className="text-sm hover:text-primary">
                          Apagar
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    {error && <p className="text-red-500">{error}</p>}
                    {sucesso && <p className="text-green-500">{sucesso}</p>}
                  </div>

                  <div id="FileUpload" className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5">
                    <input type="file" accept="image/*" className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" onChange={handleImagemChange} />
                    {imagem === null &&
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z" fill="#3C50E0" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z" fill="#3C50E0" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z" fill="#3C50E0" />
                          </svg>
                        </span>
                        <p>
                          <span className="text-primary">Click para enviar</span> ou
                          arraste e solte
                        </p>
                        <p className="mt-1.5">SVG, PNG, JPG ou GIF</p>
                        <p>(max, 112 X 112px)</p>
                      </div>
                    }
                    {imagem !== null &&
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <img src={imagem ? URL.createObjectURL(imagem) : UserOne} alt="User" className="rounded-full" />
                      </div>
                    }
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button onClick={removerImagem} className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white" type="button">
                      Cancelar
                    </button>
                    <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="submit">
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
