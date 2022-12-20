import { useNavigate } from 'react-router-dom';
import brokenImage from 'assets/images/broken.png';
import Button from 'components/Button';

function NotFound() {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className="dark:bg-slate-900 dark:text-slate-200 lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 min-h-screen items-center flex justify-center ">
            <div className="relative">
                <div className="flex justify-center">
                    <img
                        src={brokenImage}
                        alt="No encontrado"
                        className="max-h-56 md:max-h-72"
                    />
                </div>
                <div className="py-6">
                    <h1 className="my-2 text-primary font-bold text-2xl md:text-3xl lg:text-4xl text-center font-poppins">
                        Página no encontrada
                    </h1>
                    <div className="my-4 sm:w-full flex justify-center">
                        <Button onClick={goBack}>Regresar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
