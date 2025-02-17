'use client';
import ProtectedRoutes from '@/components/accessControl/ProtectedRoutes';
import Card from '@/components/Card';
import MediaViewer from '@/components/MediaViewer';
import Sort from '@/components/Sort';
import CircularLoader from '@/components/ui/CircularLoader';
import { selectFiles, selectTotalSize, setFilesState } from '@/lib/features/Files/fileSlice';
import { getFilesApi } from '@/lib/services/fileServices';
import { convertFileSize, getFileTypesParams } from '@/lib/utils';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Page = () => {


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedFile , setSelectedFile] = useState<FileState | null>(null)
    const dispatch = useDispatch();
    const params = useParams<{ type?: string; }>();
    const query = useSearchParams();
    const sort = query.get('sort') || '';


    // selectors from redux
    const files = useSelector(selectFiles);
    const totalSize = useSelector(selectTotalSize);

    const type = params.type || '';
    const types = getFileTypesParams(type);



    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);
            try {

                const data = await getFilesApi({ type: types[0], sort });
                
             
                dispatch(setFilesState({ data: data?.data , type:types[0]} ));
              
               
            } catch (error) {
                setError('Error fetching files');
                console.error('Error fetching files:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, [type, sort]);

    


    if (loading) {
        return <CircularLoader size={40} />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <ProtectedRoutes>
            <div className='page-container'>
                <section className='w-full'>

                    <h1 className="h1 capitalize">{type}</h1>

                    <div className='flex justify-between'>
                        <div className='total-size-section'>
                            <p className='body-1'>
                                Total : <span className="h5">{convertFileSize(totalSize || 0)}</span>
                            </p>
                        </div>

                        <div className='sort-container'>
                            <p className='body-1 hidden sm:block text-light-200'>
                                Sort By :
                            </p>
                            <Sort />
                        </div>
                    </div>

                </section>

                {/* render files */}

                <section className='file-list'>
                    {
                        files.length > 0 ? (

                            files.map((file, index) => (
                                <Card key={index} file={file} setSelectedFile={setSelectedFile}/>
                            ))
                        ) : (

                            <p className=' text-light-200'>
                                No Files
                            </p>

                        )


                    }
                 
                </section>


            </div>

            {
                selectedFile && (
                    
                    <MediaViewer file={selectedFile} close={()=>setSelectedFile(null)} />
                )
            }


        </ProtectedRoutes>
    );
};

export default Page;
