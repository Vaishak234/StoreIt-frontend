'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { actionsDropdownItems } from "@/constants";
import Image from "next/image";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FileDetails } from "./ActionsModalContent";
import { deleteFileApi, renameFileApi } from "@/lib/services/fileServices";
import { useDispatch } from "react-redux";
import { deleteFile, renameFile } from "@/lib/features/Files/fileSlice";
import toast from "react-hot-toast";
import {  handleDownLoad } from "@/lib/utils";


const ActionDropdown = ({ file }: { file: FileState; }) => {

   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [action, setAction] = useState<ActionType | null>(null);
    const [filename, setFileName] = useState(file.name);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const closeAllModals = () => {
        setIsModalOpen(false);
        setIsDropdownOpen(false);
        setAction(null);
        setFileName(file.name);
    };

    useEffect(() => {
        setFileName(file.name);
    }, [file.name])


  
    const handleAction = async (type: string) => {
        try {
              setIsLoading(true)
            if (type === 'rename') {
                if (!filename) return toast.error('Please enter a filename');
                if(filename.length >30) return toast.error('please enter a filename with max 30 letters')
              
                const result = await renameFileApi(file._id, filename);
             if(result) {
                 setIsLoading(false)
                 dispatch(renameFile({ id: file._id, name: filename, updatedAt: result.data.updatedAt }));
                 toast.success(result?.message || 'File renamed successfully');
             }
            }

            if (type === 'delete') {

                const result = await deleteFileApi(file._id,file.size);
                
              if(result){
                  setIsLoading(false)
                  dispatch(deleteFile({ id: result?.data }));
                  toast.success(result?.message || 'File deleted successfully');
              }
            }

            closeAllModals();
        } catch (error) {
           
            closeAllModals();
            toast.error('An error occurred while processing your request');
        }
    };



    const renderDialogContent = () => {
        if (!action) return null;

        const { value, label } = action;

        return (
            <DialogContent className="shad-dialog button"  >
                <DialogHeader className="flex flex-col gap-3">
                    <DialogTitle className="text-center text-light-100">
                        {label}
                    </DialogTitle>
                    {
                        value === 'rename' && (
                            <Input type="text" value={filename} onChange={(e) => setFileName(e.target.value)} />
                        )
                    }

                    {
                        value === 'details' && <FileDetails file={file} />
                    }

                    {
                        value === 'delete' && (
                            <p className="delete-confirmation">
                                Are you sure you want to delete{` `}
                                <span className="delete-file-name">{file.name}</span>
                            </p>
                        )
                    }
                </DialogHeader>
                <DialogDescription id="dialog-description">
                    {value === 'rename' && "Rename the file by entering a new name."}
                    {value === 'details' && "View the details of the selected file."}
                    {value === 'delete' && "Delete the file permanently."}
                </DialogDescription>
                {['rename', 'delete', 'share'].includes(value) && (
                    <DialogFooter className="flex flex-col gap-3 md:flex-row text-white">
                        <Button onClick={closeAllModals} className="modal-cancel-button" >cancel</Button>
                        <Button className="modal-submit-button" disabled={isLoading} onClick={() => handleAction(action.value)}>
                            <p className="capitalize">{value}</p>
                            {
                                isLoading && <Image src="assets/icons/loader.svg" alt="loader" width={20} height={20} className="ml-2 animate-spin" />
                            }
                        </Button>
                    </DialogFooter>
                )}

            </DialogContent>
        );
    };

    return (
        <>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} >
                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} >
                    <DropdownMenuTrigger className="shad-no-focus">
                        <Image src="/assets/icons/dots.svg" alt="dots" width={34} height={34} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] mr-4">

                        <DropdownMenuLabel className="max-w-[200px] w-full truncate">My Account </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {
                            actionsDropdownItems?.map((item, index) => (
                                <DropdownMenuItem key={index} className="shad-dropdown-item"
                                    onClick={() => {
                                        setAction(item);

                                        if (
                                            ["rename", "share", "delete", "details"].includes(
                                                item.value,
                                            )
                                        ) {
                                            setIsModalOpen(true);
                                        }
                                    }} >
                                    {item.value === "download" ? (
                                        <div className="flex items-center gap-2"
                                            onClick={() => handleDownLoad(file.url)}
                                        >
                                            <Image
                                                src={item.icon}
                                                alt={item.label}
                                                width={30}
                                                height={30}
                                            />
                                            {item.label}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={item.icon}
                                                alt={item.label}
                                                width={30}
                                                height={30}
                                            />
                                            {item.label}
                                        </div>
                                    )}
                                </DropdownMenuItem>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>


                {renderDialogContent()}

            </Dialog>

        </>
    );
};

export default ActionDropdown;
