import {
  Affix,
  Button,
  Input,
  message,
  PageHeader,
  Popconfirm,
  Select,
  Upload,
  UploadProps,
} from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineLoading,
  AiOutlineSave,
} from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import EditorComponent from "shared/components/editor/EditorComponent";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import * as Yup from "yup";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export const UpdateNews: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [detailData, setDetailData] = useState<any>({
    title: "",
    content: "",
    category: undefined,
  });
  useEffect(() => {
    if (id) getDetailData();
  }, []);

  const formik: any = useFormik({
    initialValues: {
      ...detailData,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required!"),
      content: Yup.string().required("Required!"),
      category: Yup.string().required("Required!"),
    }),
    onSubmit: async (values) => {
      if (id) {
        onUpdateNews(values);
      } else {
        onCreateNews(values);
      }
    },
    enableReinitialize: true,
  });

  const getDetailData = () => {
    fetch(`http://localhost:8000/wp-json/wp/v2/posts/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(false);

          setDetailData({
            id: result.id,
            title: result.title?.rendered,
            content: result.content?.rendered,
            category: result.categories[0],
            createAt: result.date,
          });
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  const onCreateNews = (values: any) => {
    try {
      setLoading(true);
      fetch("http://localhost:8000/wp-json/wp/v2/posts", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${CliCookieService.get(
            CLI_COOKIE_KEYS.ACCESS_TOKEN
          )}`,
        },
        method: "POST",
        body: JSON.stringify({
          title: values.title,
          content: values.content,
          category: values.category,
          status: "publish",
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(false);
            navigate(PROTECTED_ROUTES_PATH.NEWS);
          },
          (error) => {
            console.log("error", error);
            setLoading(false);
          }
        );
    } catch (error) {
      console.error("Exception " + error);
    }
  };

  const onUpdateNews = (values: any) => {
    try {
      setLoading(true);
      fetch(`http://localhost:8000/wp-json/wp/v2/posts/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${CliCookieService.get(
            CLI_COOKIE_KEYS.ACCESS_TOKEN
          )}`,
        },
        method: "PUT",
        body: JSON.stringify({
          title: values.title,
          content: values.content,
          categories: values.category,
          status: "publish",
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(false);
            navigate(PROTECTED_ROUTES_PATH.NEWS);
          },
          (error) => {
            console.log("error", error);
            setLoading(false);
          }
        );
    } catch (error) {
      console.error("Exception " + error);
    }
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    // if (info.file.status === 'uploading') {
    //   return;
    // }
    // if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setLoading(false);
      setImageUrl(
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      );
    });
    // }
  };

  const uploadButton = (
    <div>
      <div className="flex justify-center">
        {loading ? <AiOutlineLoading /> : <BsPlusCircle />}
      </div>
      <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
    </div>
  );

  const optionsTopic = [
    { label: "Giới thiệu", value: 1 },
    { label: "Tuyển sinh", value: 2 },
    { label: "Đào tạo", value: 3 },
    { label: "Nghiên cứu", value: 4 },
    { label: "Sinh viên", value: 5 },
  ];

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Affix offsetTop={10}>
          <PageHeader
            ghost={false}
            onBack={() => navigate(-1)}
            title={`${id ? "Cập nhật" : "Thêm"} bài viết`}
            extra={[
              <Popconfirm
                key="1"
                placement="bottom"
                title={`Bạn chắc chắn muốn hủy bài viết ?`}
                onConfirm={() => {
                  alert("Hủy bài viết");
                }}
                okText="Hủy"
                cancelText="Bỏ qua"
                okButtonProps={{ type: "primary", danger: true }}
              >
                <Button danger type="primary">
                  <div className="flex items-center">
                    <AiOutlineCloseCircle className="mr-2" /> Hủy
                  </div>
                </Button>
              </Popconfirm>,
              <Button
                key="2"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                <div className="flex items-center">
                  <AiOutlineSave className="mr-2" /> Lưu
                </div>
              </Button>,
            ]}
          />
        </Affix>

        <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4 bg-white p-4">
          <div className="col-span-6">
            <div className="font-semibold mb-2 text-gray-500">
              <span className="text-red-600">*</span> Tiêu đề
            </div>
            <Input
              placeholder="Nhập tiêu đề bài viết"
              id="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <div className="text-red-500 mt-1">
              {formik.errors.title && formik.touched.title && (
                <p>{formik.errors.title}</p>
              )}
            </div>
          </div>
          <div className="col-span-6">
            <div className="font-semibold mb-2 text-gray-500">
              <span className="text-red-600">*</span> Loại bài viết
            </div>
            <Select
              placeholder="Chọn chủ đề bài viết"
              style={{ width: "100%" }}
              options={optionsTopic}
              id="category"
              onChange={(value: string) =>
                formik.setFieldValue("category", value)
              }
              value={formik.values.category}
            />
            <div className="text-red-500 mt-1">
              {formik.errors.category && formik.touched.category && (
                <p>{formik.errors.category}</p>
              )}
            </div>
          </div>

          <div className="col-span-6">
            <div className="font-semibold mb-2 text-gray-500">
              Ảnh bìa bài viết:
            </div>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
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
              onChange={(value: string) =>
                formik.setFieldValue("content", value)
              }
              value={formik.values.content}
              id="content"
              editorStyle={{
                border: "1px solid #ACB0B0",
                borderRadius: "5px",
                overflow: "hidden scroll",
                paddingInline: 10,
              }}
              height={500}
            />
            <div className="text-red-500 mt-1">
              {formik.errors.content && formik.touched.content && (
                <p>{formik.errors.content}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
