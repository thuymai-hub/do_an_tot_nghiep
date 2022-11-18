import { Affix, Button, message, PageHeader, Popconfirm, Upload, UploadProps } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import React, { useState } from 'react';
import { AiOutlineCloseCircle, AiOutlineLoading, AiOutlineSave } from 'react-icons/ai';
import { BsPlusCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import EditorComponent from 'shared/components/editor/EditorComponent';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const UpdateForum: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    // if (info.file.status === 'uploading') {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setLoading(false);
      setImageUrl('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png');
    });
    // }
  };

  const uploadButton = (
    <div>
      <div className="flex justify-center">{loading ? <AiOutlineLoading /> : <BsPlusCircle />}</div>
      <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
    </div>
  );

  return (
    <div>
      <Affix offsetTop={10}>
        <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title={`Thêm diễn đàn`}
          extra={[
            <Popconfirm
              key="1"
              placement="bottom"
              title={`Bạn chắc chắn muốn hủy diễn đàn ?`}
              onConfirm={() => {
                alert('Hủy diễn đàn');
              }}
              okText="Hủy"
              cancelText="Bỏ qua"
              okButtonProps={{ type: 'primary', danger: true }}>
              <Button danger type="primary">
                <div className="flex items-center">
                  <AiOutlineCloseCircle className="mr-2" /> Hủy
                </div>
              </Button>
            </Popconfirm>,
            <Button key="2" type="primary">
              <div className="flex items-center">
                <AiOutlineSave className="mr-2" /> Lưu
              </div>
            </Button>
          ]}
        />
      </Affix>

      <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4 bg-white p-4">
        <div className="col-span-12">
          <div className="font-semibold mb-2 text-gray-500">Ảnh diễn đàn:</div>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}>
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className="col-span-12">
          <div className="font-semibold mb-2 text-gray-500">Nội dung:</div>
          <EditorComponent
            onChange={(value: string) => {
              console.log(value);
            }}
            editorStyle={{
              border: '1px solid #ACB0B0',
              borderRadius: '5px',
              overflow: 'hidden scroll',
              paddingInline: 10
            }}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};
