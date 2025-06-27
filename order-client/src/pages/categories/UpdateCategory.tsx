import { Input, Modal, notification } from "antd";
import { useState , useEffect } from "react";
export interface ICategory {
    name: string
}
interface IProps {
    getData: any;
    isUpdateModalOpen: boolean;
    setisUpdateModalOpen: (v: boolean) => void;
    dataUpdate: null | ICategory;
    setDataUpdate: any;
}
const UpdateCategory = (props: IProps) => {
    const [name, setname] = useState("");
    const { 
        getData, 
        isUpdateModalOpen, 
        setisUpdateModalOpen , 
        dataUpdate,
        setDataUpdate

    } = props;
    useEffect(() => {
        if(dataUpdate) {
            setname(dataUpdate.name);
        }
    }, [dataUpdate])
    console.log("check data: ", dataUpdate);
    const handleOk = async () => {
        const data = {
            name
        };
        const res = await fetch("https://ordercoffeebe.onrender.com/api/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data }),
        });
        const d = await res.json();
        if (d.data) {
            getData();
            notification.success({
                message: JSON.stringify(d.message)
            });
        } else {
            //
        }
        setisUpdateModalOpen(false);
    };

    const handleCancel = () => {
        setname("");
        setisUpdateModalOpen(false);
        setDataUpdate(null);
    };
    return (
        <Modal
            title="Update Category"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isUpdateModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div>
                <Input
                    placeholder="Input Name Category"
                    value={name}
                    onChange={(event) => setname(event.target.value)}
                />
            </div>
        </Modal>
    );
}
export default UpdateCategory;