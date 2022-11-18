import {
  Affix,
  Button,
  DatePicker,
  DatePickerProps,
  Input,
  message,
  PageHeader,
  Popconfirm,
  Upload,
  UploadProps
} from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { AiOutlineCloseCircle, AiOutlineLoading, AiOutlineSave } from 'react-icons/ai';
import { BsPlusCircle } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import EditorComponent from 'shared/components/editor/EditorComponent';
import { CliCookieService, CLI_COOKIE_KEYS } from 'shared/services/cli-cookie';
import * as Yup from 'yup';

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

const { RangePicker } = DatePicker;

const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
  console.log('onOk: ', value);
};

export const UpdateEvent: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [detailData, setDetailData] = useState<any>({
    title: '',
    content: '',
    dateEvent: ''
  });

  useEffect(() => {
    if (id) getDetailData();
  }, []);

  const getDetailData = () => {
    fetch(`http://localhost:8000/wp-json/wp/v2/event/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(false);

          setDetailData({
            id: result.id,
            title: result.title?.rendered,
            content: result.content?.rendered,
            dateEvent: result.dateEvent.rendered,
            createAt: result.date
          });
        },
        (error) => {
          console.log('error', error);
          setLoading(false);
        }
      );
  };

  const formik: any = useFormik({
    initialValues: {
      ...detailData
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required!'),
      content: Yup.string().required('Required!'),
      dateEvent: Yup.string().required('Required!')
    }),
    onSubmit: async (values) => {
      console.log('values', values);

      try {
        setLoading(true);
        fetch('http://localhost:8000/wp-json/wp/v2/event', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN)}`
          },
          method: 'POST',
          body: JSON.stringify({
            title: values.title,
            content: values.content,
            dateEvent: values.dateEvent, // tách startDate và endDate
            status: 'publish'
          })
        })
          .then((res) => res.json())
          .then(
            (result) => {
              setLoading(false);
              navigate(PROTECTED_ROUTES_PATH.EVENTS);
            },
            (error) => {
              console.log('error', error);
              setLoading(false);
            }
          );
      } catch (error) {
        console.error('Exception ' + error);
      }
    },
    enableReinitialize: true
  });
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
      <form onSubmit={formik.handleSubmit}>
        <Affix offsetTop={10}>
          <PageHeader
            ghost={false}
            onBack={() => navigate(-1)}
            title={`Thêm sự kiện`}
            extra={[
              <Popconfirm
                key="1"
                placement="bottom"
                title={`Bạn chắc chắn muốn hủy sự kiện ?`}
                onConfirm={() => {
                  alert('Hủy sự kiện');
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
          <div className="col-span-6">
            <div className="font-semibold mb-2 text-gray-500">
              <span className="text-red-600">*</span> Tên sự kiện
            </div>
            <Input
              placeholder="Nhập tên sự kiện"
              id="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <div className="text-red-500 mt-1">
              {formik.errors.title && formik.touched.title && <p>{formik.errors.title}</p>}
            </div>
          </div>
          <div className="col-span-6">
            <div className="font-semibold mb-2 text-gray-500">
              <span className="text-red-600">*</span> Thời gian diễn ra
            </div>
            <RangePicker
              style={{ width: '100%' }}
              placeholder={['Bắt đầu', 'Kết thúc']}
              showTime={{ format: 'HH:mm' }}
              format="DD/MM/YYYY HH:mm"
              onChange={(
                value: DatePickerProps['value'] | RangePickerProps['value'],
                dateString: [string, string] | string
              ) => {
                formik.setFieldValue('dateEvent', dateString);
              }}
              id="dateEvent"
            />
            <div className="text-red-500 mt-1">
              {formik.errors.dateEvent && formik.touched.dateEvent && (
                <p>{formik.errors.dateEvent}</p>
              )}
            </div>
          </div>

          <div className="col-span-12">
            <div className="font-semibold mb-2 text-gray-500">Ảnh sự kiện:</div>
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
            <div className="font-semibold mb-2 text-gray-500">
              <span className="text-red-600">*</span> Nội dung:
            </div>
            <EditorComponent
              onChange={(value: string) => formik.setFieldValue('content', value)}
              value={formik.values.content}
              id="content"
              editorStyle={{
                border: '1px solid #ACB0B0',
                borderRadius: '5px',
                overflow: 'hidden scroll',
                paddingInline: 10
              }}
              height={500}
            />
            <div className="text-red-500 mt-1">
              {formik.errors.content && formik.touched.content && <p>{formik.errors.content}</p>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
