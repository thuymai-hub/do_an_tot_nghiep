import { Button, Input, PageHeader } from "antd";
import ButtonAdd from "components/Button/ButtonAdd";
import Container from "container/Container";
import React, { useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import { useTableData } from "shared/hooks/useTableData";
import { ForumItem } from "../components/ForumItem";

const { Search } = Input;
interface TFilter {
  page?: number;
  search?: string;
}
export const ForumPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandFilter, setExpandFilter] = useState<TFilter>({
    search: "",
    page: 1,
  });
  const searchRef: any = useRef();
  const { dataSource, loading, paging, setPaging } = useTableData({
    expandFilter,
    fetchList: null,
  });

  const tranferPage = (mode = "add", id?: string | number) => {
    if (id) {
      navigate(`${PROTECTED_ROUTES_PATH.FORUM}/${mode}/${id}`);
      return;
    } else {
      navigate(`${PROTECTED_ROUTES_PATH.FORUM}/add`);
    }
  };
  const onSearch = (value: string) => {
    console.log("value", value);
  };

  return (
    <Container
      header={
        <PageHeader
          style={{ borderRadius: 8 }}
          title="Danh sách tài khoản"
          extra={[
            <ButtonAdd key={1} text="Thêm mới" onClickButton={() => {}} />,
          ]}
        />
      }
      // filterComponent={<Filter />}
      contentComponent={
        <div>
          {[1, 2, 3]?.map((item) => (
            <ForumItem key={item} />
          ))}
        </div>
      }
    />
  );
};
