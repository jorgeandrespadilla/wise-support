import { useQuery } from '@tanstack/react-query';
import Button from 'components/Button';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import InfoLabel from 'components/InfoLabel';
import Loader from 'components/Loader';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticle } from 'services/articles';
import { GetArticleResponse } from 'types';
import { formatDateForDisplay } from 'utils/dateHelpers';
import { handleAPIError } from 'utils/validation';

function ArticleDetail() {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<GetArticleResponse | undefined>();
    const navigate = useNavigate();

    const { isLoading } = useQuery(
        ['article', id],
        async () => {
            if (!id) return;
            const res = await getArticle(id);
            return res;
        },
        {
            onSuccess: data => {
                setArticle(data);
            },
            onError: e => {
                handleAPIError(e);
                navigate('/articles');
            },
            refetchOnWindowFocus: false,
        },
    );

    if (isLoading)
        return (
            <Card>
                <div className="flex flex-col items-center justify-center h-32">
                    <Loader />
                </div>
            </Card>
        );

    return (
        <Card>
            <CardHeader title={article?.title ?? 'Artículo'} />
            <div className="flex flex-col pt-8 pb-8 space-y-4">
                <InfoLabel label="Categoría" value={article?.category ?? ''} />
                <InfoLabel
                    label="Fecha de creación"
                    value={formatDateForDisplay(
                        new Date(article?.createdAt ?? ''),
                        'local',
                        'datetime',
                    )}
                />
                <InfoLabel
                    label="Fecha de modificaciòn"
                    value={formatDateForDisplay(
                        new Date(article?.updatedAt ?? ''),
                        'local',
                        'datetime',
                    )}
                />
                <div className="flex flex-col pt-5">
                    <InfoLabel value={article?.content ?? ''} />
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Button as="link" navigateTo="/articles" type="secondary">
                    Regresar
                </Button>
            </div>
        </Card>
    );
}

export default ArticleDetail;
