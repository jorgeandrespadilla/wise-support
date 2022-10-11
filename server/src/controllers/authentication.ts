import { UnauthorizedError, ValidationError } from "@/common/errors";
import { db } from "@/database/client";
import { AuthRequestSchema } from "@/schemas/authentication";
import { TokenData } from "@/types";
import { generateToken } from "@/utils/authToken";
import { catchErrors } from "@/utils/catchErrors";
import { verifyHash } from "@/utils/crypto";
import { validateAndParse } from "@/utils/validation";

export const authenticateUser = catchErrors(async (req, res) => {
    const data = validateAndParse(AuthRequestSchema, req.body);
    const user = await db.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (!user) throw new UnauthorizedError("El usuario no existe.");

    const isValidPassword = await verifyHash(data.password, user.password);
    if (!isValidPassword) throw new ValidationError("Inicio de sesión fallido.");

    res.send({ 
        message: "Inicio de sesión exitoso.",
        authToken: generateToken<TokenData>({
            userId: user.id,
        })
    });	
});
