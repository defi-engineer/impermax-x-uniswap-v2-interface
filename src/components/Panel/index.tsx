
import clsx from 'clsx';

const Panel = ({
  className,
  ...rest
}: React.ComponentPropsWithRef<'div'>): JSX.Element => (
  <div
    className={clsx(
      'bg-white',
      'shadow',
      'overflow-hidden',
      'md:rounded',
      className
    )}
    {...rest} />
);

export default Panel;