import Button from 'components/Button';
import secureImage from 'assets/images/secure.png';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center ">
            <div className="relative">
                <div className="flex justify-center">
                    <img
                        src={secureImage}
                        alt="No autorizado"
                        className="max-h-48 md:max-h-64"
                    />
                </div>
                <div className="py-6">
                    <h1 className="my-2 text-primary font-bold text-2xl md:text-3xl lg:text-4xl text-center font-poppins">
                        Usuario no autorizado
                    </h1>
                    <div className="my-4 sm:w-full flex justify-center">
                        <Button onClick={goBack}>Regresar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Unauthorized;
