import { useState, useRef } from 'react';

export default () => {
  console.log('import Button');

  const Button: React.FC = () => {
    const [open, setOpen] = useState(false);

    const ref = useRef() as React.MutableRefObject<HTMLButtonElement>;
    // const arrowRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const [arrowRef, setArrowRef] =
      useState<React.MutableRefObject<HTMLDivElement> | null>(null);

    return (
      <>
        <div className="py-8 px-8">Button</div>
        <div>Button</div>
      </>
    );
  };

  return Button;
};
