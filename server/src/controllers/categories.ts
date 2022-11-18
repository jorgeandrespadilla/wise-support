import { EntityNotFoundError, ValidationError } from "@/common/errors";
import { db } from "@/database/client";
import { CategoryRequestSchema } from "@/schemas/categories";
import { Category, CategoryResponse, SelectFields } from "@/types";
import { catchErrors } from "@/utils/catchErrors";
import { validateAndParse } from "@/utils/validation";

const fieldsToSelect: SelectFields<Category> = {
    id: true,
    code: true,
    name: true,
    description: true,
};

export const getCategories = catchErrors(async (_req, res) => {
    const categories: CategoryResponse[] = await db.category.findMany({
        select: fieldsToSelect
    });

    res.send(categories);
});

export const getCategoryById = catchErrors(async (req, res) => {
    const categoryId = Number(req.params.categoryId);

    await validateCategory(categoryId);

    const category = await db.category.findUnique({
        where: { id: categoryId },
        select: fieldsToSelect
    });
    res.send(category);
});

export const createCategory = catchErrors(async (req, res) => {
    const { ...data } = validateAndParse(CategoryRequestSchema, req.body);

    await validateExistingCode(data.code);

    const category = await db.category.create({
        data: {
            ...data,
        },
        select: fieldsToSelect
    });
    res.send(category);
});

export const updateCategory = catchErrors(async (req, res) => {
    const categoryId = Number(req.params.categoryId);
    const { ...data } = validateAndParse(CategoryRequestSchema, req.body);

    await validateCategory(categoryId);

    const category = await db.category.update({
        where: { id: categoryId },
        data: {
            ...data,
        },
        select: fieldsToSelect
    });
    res.send(category);
});

export const deleteCategory = catchErrors(async (req, res) => {
    const categoryId = Number(req.params.categoryId);

    await validateCategory(categoryId);
    await validateCategoryToDelete(categoryId);

    await db.category.delete({
        where: { id: categoryId },
    });

    res.send({ message: "Categoría eliminada." });
});


//#region Validation functions

async function validateCategory(categoryId: number) {
    const category = await db.category.findUnique({
        where: { id: categoryId },
    });

    if (!category) throw new EntityNotFoundError("Categoría", { id: categoryId });
}

async function validateExistingCode(code: string) {
    const category = await db.category.findUnique({
        where: { code },
    });

    if (category) throw new ValidationError("El código de categoría ya existe");
}

async function validateCategoryToDelete(categoryId: number) {
    const tickets = await db.ticket.findMany({
        where: { categoryId },
    });

    if (!tickets.isEmpty()) {
        throw new ValidationError("La categoría tiene tickets asociados.");
    }
}

//#endregion