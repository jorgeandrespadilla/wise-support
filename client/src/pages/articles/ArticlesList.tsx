import { useQuery } from '@tanstack/react-query';
import { EyeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Card from 'components/Card';
import IconButton from 'components/IconButton';
import CardHeader from 'components/CardHeader';
import Input from 'components/Input';
import Divider from 'components/Divider';
import {
    Cell,
    HeaderCell,
    TableBody,
    TableContainer,
    TableEmpty,
} from 'components/Table';
import { handleAPIError } from 'utils/validation';
import { isDefined, sortDescByDateTime } from 'utils/dataHelpers';
import { getArticles } from 'services/articles';
import { useState } from 'react';
import { formatDateForDisplay } from 'utils/dateHelpers';

function ArticlesList() {
    const [search, setSearch] = useState('');

    const articles = useQuery(
        ['articles'],
        async () => {
            const data = await getArticles();
            return sortDescByDateTime(data, article => article.createdAt);
        },
        {
            onError: e => {
                handleAPIError(e);
            },
        },
    );

    const filteredArticles = articles.data?.filter(raticle => {
        return raticle.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <Card>
                <CardHeader title="Base de conocimientos" />
                <Divider vertical="lg" showRule />
                <div className="flex flex-row justify-between items-center pb-4 gap-4">
                    <Input
                        value={search}
                        onChange={setSearch}
                        placeholder="Buscar"
                        width="half"
                        prefixContent={
                            <div className="pl-3">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                        }
                    />
                </div>
                <TableContainer>
                    <thead>
                        <tr className="border-0 border-b-2 text-left">
                            <HeaderCell>Título</HeaderCell>
                            <HeaderCell>Categoría</HeaderCell>
                            <HeaderCell>Fecha de creación</HeaderCell>
                            <HeaderCell>Acciones</HeaderCell>
                        </tr>
                    </thead>
                    <TableBody loading={articles.isLoading}>
                        {isDefined(filteredArticles) &&
                        !filteredArticles.isEmpty() ? (
                            filteredArticles.map((article, index) => {
                                return (
                                    <tr
                                        key={article.id}
                                        className={`table-row ${
                                            !filteredArticles.isLast(index)
                                                ? 'border-b'
                                                : ''
                                        }`}
                                    >
                                        <Cell>{article.title}</Cell>
                                        <Cell>{article.category}</Cell>
                                        <Cell>
                                            {formatDateForDisplay(
                                                new Date(article.createdAt),
                                                'local',
                                                'datetime',
                                            )}
                                        </Cell>
                                        <Cell>
                                            <div className="flex space-x-2">
                                                <IconButton
                                                    title="Ver artículo"
                                                    as="link"
                                                    navigateTo={`/articles/${article.id}`}
                                                    icon={
                                                        <EyeIcon className="h-5 w-5 text-blue-500" />
                                                    }
                                                />
                                            </div>
                                        </Cell>
                                    </tr>
                                );
                            })
                        ) : (
                            <TableEmpty />
                        )}
                    </TableBody>
                </TableContainer>
            </Card>
        </>
    );
}

export default ArticlesList;
