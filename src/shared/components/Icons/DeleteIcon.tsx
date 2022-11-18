import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

export default function DeleteIcon({ ...params }) {
  return <AiOutlineDelete className="text-danger-color cursor-pointer text-xl" {...params} />;
}
