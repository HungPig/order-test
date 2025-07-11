import { Input, Modal, notification } from "antd";
import { useState } from "react";
interface IProps {
    getData: any;
    isCreateModalOpen: boolean;
    setisCreateModalOpen: (v: boolean) => void;
}
const Createcategory = (props: IProps) => {
    const [name, setname] = useState("");
    const { getData, isCreateModalOpen, setisCreateModalOpen } = props;
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
            })
        } else {
            notification.success({
                message: JSON.stringify(d.message)
            })
        }
        setisCreateModalOpen(false);
    };

    const handleCancel = () => {
        setname("");
        setisCreateModalOpen(false);
      };
    return (
        <Modal
            title="Create Category"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isCreateModalOpen}
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
export default Createcategory;