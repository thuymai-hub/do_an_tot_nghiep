const StatusType: any = {
  Processing: { text: 'Processing', className: 'bg-blue-100 text-blue-600' },
  Success: { text: 'Success', className: 'bg-green-100 text-green-600' },
  Active: { text: 'Active', className: 'bg-green-100 text-green-600' },
  Approved: { text: 'APPROVED', className: 'bg-green-100 text-green-600' },
  Error: { text: 'Error', className: 'bg-red-100 text-red-600' }
};

export const renderStatus = (status: string) => {
  return (
    <div
      className={`${
        StatusType[status] && StatusType[status].className
      } p-1 font-semibold text-center rounded`}>
      {StatusType[status] && StatusType[status].text}
    </div>
  );
};

export const renderDisableUser = (value: boolean) => {
  switch (value) {
    case false:
      return (
        <div className="bg-green-100 text-green-600 p-1 font-semibold text-center rounded">
          Active
        </div>
      );
    case true:
      return (
        <div className="bg-red-100 text-red-600 p-1 font-semibold text-center rounded">Blocked</div>
      );
  }
};
