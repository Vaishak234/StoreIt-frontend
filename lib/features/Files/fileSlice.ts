'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getDomainOfItemsWithSameAxis } from 'recharts/types/util/ChartUtils';

type FileTypesState ={
    _id: string,
    size: number;
}

type FileDataType = {
    files: FileState[], 
    totalSize: number, 
    fileTypes: FileTypesState[]
}

type initialStateType = {
    files: FileState[],
    totalSize: number, 
    type: FileTypesState[];
}

const initialState: initialStateType = {
    files: [],
    totalSize: 0,
    type:[]
};

const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {

        setFilesState: (state, action: PayloadAction<{ data: FileDataType, type: string; }>) => {
            const { data, type } = action.payload;


            if (data?.files) {
                if (!Array.isArray(data.files)) {
                    console.error('Payload must be an array of FileState objects');
                    return;
                }

                if (typeof data.totalSize !== 'number') {
                    console.error('Total size must be a number');
                    return;
                }

                state.files = [...data.files];
                state.type = data.fileTypes; 
                state.totalSize = data.totalSize;
            }
        },

        addFileState: (state, action: PayloadAction<{ data: FileState, type: string}>) => {
            const { data, type } = action.payload;

            
            if (type === 'home') {
           
                if (state.files.length >= 6) {
                    state.files.pop()
                }

                state.files = [data, ...state.files];
                state.totalSize += data.size;
                state.type = state.type.map((item) => {
                    if (item._id === data.type) {
                        return {
                            ...item,      
                            size: item.size + data.size 
                        };
                    }
                    return item; 
                });

            }
            // If the files array is empty or the first file type matches the new file type
            else if (state.files.length !== 0 && state.files[0].type === data.type) {
                state.files.push(data);
                state.totalSize += data.size;
            }
            else if (state.files.length === 0 && type === data.type) {
                state.files.push(data);
                state.totalSize += data.size;
            } 
            
        },
        deleteFile: (state, action: PayloadAction<{ id: string; }>) => {
            const file = state.files.find(file => file._id === action.payload.id);

            if (!file) {
                console.error(`File with id ${action.payload.id} not found.`);
                return;
            }

            state.files = state.files.filter(file => file._id !== action.payload.id);
            state.totalSize -= file.size;
        },
        renameFile: (state, action: PayloadAction<{ id: string, name: string, updatedAt: string; }>) => {

            const index = state.files.findIndex(file => file._id === action.payload.id);
            if (index !== -1) {
                const { name, updatedAt } = action.payload;
                state.files[index] = { ...state.files[index], name, updatedAt };
            } else {
                console.error('File not found:', action.payload.id);
            }

        },
    },
});

export const selectFiles = (state: RootState) => state.files.files;
export const selectFilesType = (state: RootState) => state.files.type;
export const selectTotalSize = (state: RootState) => state.files.totalSize;

export const { setFilesState, addFileState, deleteFile, renameFile } = fileSlice.actions;

export default fileSlice.reducer;
