// Remix Icons: https://remixicon.com/
// Github: https://github.com/Remix-Design/RemixIcon

import * as RemixIcons from '@remixicon/react';
import { twMerge } from 'tailwind-merge';
import { iconVariantStyles } from '../variantStyles';

export type IconName =
  | 'RiMenuLine'
  | 'RiMenu3Line'
  | 'RiToggleLine'
  | 'RiToggleFill'
  | 'RiNotification3Line'
  | 'RiUser3Line'
  | 'RiPencilLine'
  | 'RiSearchLine'
  | 'RiBookmarkLine'
  | 'RiArrowRightUpLine'
  | 'RiArrowRightLine'
  | 'RiMoreLine'
  | 'RiCloseLine'
  | 'RiAddLine'
  | 'RiCircleFill'
  | 'RiMailFill'
  | 'RiShareForwardFill'
  | 'RiShareForwardLine'
  | 'RiEyeLine'
  | 'RiEyeFill'
  | 'RiCake2Fill'
  | 'RiGithubFill'
  | 'RiTwitterXFill'
  | 'RiDiscordFill'
  | 'RiGoogleFill'
  | 'RiAlertLine'
  | 'RiErrorWarningLine';

type IconVariants = 'primary' | 'secondary' | 'alert' | 'ghost' | 'shallow';

export type IconVariantStyles = {
  base: string;
  primary: string;
  secondary: string;
  alert: string;
  shallow: string;
  ghost: string;
};

export type IconProps = {
  name: IconName;
  className?: String;
  size?: number;
  hasHover?: boolean;
  toolTip?: boolean;
  toolTipSide?: 'top' | 'right' | 'bottom' | 'left';
  variant?: IconVariants;
  onClick?: () => void;
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  hasHover = true,
  variant = 'base',
  toolTip,
  toolTipSide,
  onClick,
}) => {
  const DynamicIcon = RemixIcons[name];

  const getStyles = () => {
    switch (variant) {
      case 'primary':
        return `${iconVariantStyles['primary']}`;
      case 'secondary':
        return `${iconVariantStyles['secondary']}`;
      case 'alert':
        return `${iconVariantStyles['alert']}`;
      case 'ghost':
        return `${iconVariantStyles['ghost']}`;
      case 'shallow':
        return `${iconVariantStyles['shallow']}`;
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <DynamicIcon
        className={twMerge(
          getStyles(),
          'cursor-pointer',
          hasHover && 'hover:opacity-75'
        )}
        size={size}
        onClick={onClick}
      />
    </div>
  );
};

export default Icon;
