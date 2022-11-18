import { Avatar, Button, Comment, Input, Popover } from 'antd';
import R from 'assets';
import moment from 'moment';
import { AiOutlineComment, AiOutlineHeart, AiOutlineSend } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';

export const ForumItem = () => {
  const data = `  GS.TS Nguyễn Trung Việt – Phó Hiệu trưởng Trường ĐH Thuỷ Lợi khẳng định, tuần sinh hoạt
    công dân là hoạt động chính trị ý nghĩa và được tổ chức thường niên trước khi sinh viên
    bước vào năm học mới. Thông qua tuần sinh hoạt công dân, nhằm nâng cao nhận thức của sinh
    viên về đường lối, chủ trương của Đảng, chính sách, pháp luật của Nhà nước. Giúp các em
    nắm bắt tình hình kinh tế, chính trị của đất nước và của địa phương. Ngoài ra, Tuần sinh
    hoạt công dân đầu khóa sẽ giúp sinh viên hiểu rõ quyền lợi, nghĩa vụ, ý thức trách nhiệm
    của công dân – sinh viên thông qua việc tuyên truyền, phổ biến Luật giáo dục đại học, Học
    tập và làm theo tấm gương đạo đức Hồ Chí Minh; Hướng dẫn cách thức đăng ký môn học; các
    quy chế, quy định về đào tạo, kế hoạch năm học 2022 – 2023… Cũng trong khuôn khổ của tuần
    sinh hoạt công dân, sinh viên còn được đại diện các đơn vị chức năng trong trường giới
    thiệu về ngành nghề, cơ hội việc làm trong và ngoài nước. Công tác thư viện, một số quy
    định về an ninh, an toàn trên không gian mạng... Đây cũng là dịp để các em sinh viên khóa
    mới tìm hiểu về các Câu lạc bộ sinh viên, các hoạt động thường niên của tổ chức Đoàn; bồi
    đắp thêm truyền thống và lý tưởng cho các em. Trên tinh thần đó, hun đúc tinh thần yêu
    nước, lòng tự hào, tự tôn dân tộc. Đồng thời, giúp các em có động lực trong học tập,
    nghiên cứu trong 4 năm học đại học. Trước mắt là hoàn thành tốt nhiệm vụ học tập năm học
    2022 – 2023.`;

  const comments: any = [
    {
      key: 1,
      actions: null,
      author: 'Mai Ánh Thùy',
      avatar: R.images.avatar_default,
      content: 'Bài viết hay quá!!',
      datetime: undefined
    },
    {
      key: 2,
      actions: null,
      author: 'Nguyễn Văn A',
      avatar: R.images.avatar_ver2,
      content: 'Tuyệt vời <3 <3',
      datetime: undefined
    },
    {
      key: 3,
      actions: null,
      author: 'Trần Văn B',
      avatar: R.images.avatar_ver1,
      content: 'Hấp dẫn thực sự!!',
      datetime: undefined
    }
  ];

  return (
    <div className="flex justify-center mt-3">
      <div className="bg-white rounded-xl w-3/4 shadow-lg">
        <div className="grid grid-cols-12 gap-x-2 gap-y-4 px-4 py-2">
          <div className="col-span-1 flex justify-center items-center">
            <Avatar style={{ width: 36, height: 36 }} src={R.images.avatar_default} />
          </div>
          <div className="col-span-11 flex justify-between">
            <div>
              <div className="font-semibold">Mai Ánh Thùy</div>
              <div>{moment().format('DD/MM/YYYY HH:mm')}</div>
            </div>
            <div className="cursor-pointer flex justify-center items-center">
              <Popover
                trigger="click"
                content={
                  <div>
                    <div className="cursor-pointer hover:bg-gray-200 p-1">Sửa bài viết</div>
                    <div className="cursor-pointer text-red-500 hover:bg-gray-200 p-1">
                      Xóa bài viết
                    </div>
                  </div>
                }
                title={null}>
                <BsThreeDots />
              </Popover>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 text-justify" dangerouslySetInnerHTML={{ __html: data }} />

        <hr />
        <div className="flex text-xl px-4 py-2">
          <div
            className="flex items-center cursor-pointer px-4 py-2 rounded hover:bg-gray-200"
            onClick={() => {
              alert('Liked!!!');
            }}>
            <AiOutlineHeart className="mr-2 " />
            100
          </div>
          <div
            className="flex items-center cursor-pointer px-4 py-2 rounded hover:bg-gray-200"
            onClick={() => {
              alert('Comment!!!');
            }}>
            <AiOutlineComment className="mr-2 " />8
          </div>
        </div>
        <div className="px-4 pb-2 flex flex-row">
          <Input.Group compact>
            <Input
              size="large"
              placeholder="Bình luận về bài viết này"
              style={{ width: 'calc(100% - 50px)' }}
            />
            <Button type="primary" size="large">
              <AiOutlineSend />
            </Button>
          </Input.Group>
        </div>
        <div className="px-4 pb-2">
          {comments.map((item: any) => (
            <Comment
              key={item.id}
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
