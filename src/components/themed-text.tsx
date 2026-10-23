import { Text, TextProps } from 'react-native';
import { TypographyVariant } from '../theme';

export interface ThemedTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  className?: string;
}

const variantClasses: Record<TypographyVariant, string> = {
  display: 'text-[56px] leading-[58px] font-display text-text-primary tracking-tight',
  heading: 'text-[28px] leading-[34px] font-heading text-text-primary tracking-tight',
  title: 'text-[20px] leading-[26px] font-semibold text-text-primary',
  body: 'text-[16px] leading-[24px] font-body text-text-secondary',
  caption: 'text-[14px] leading-[20px] font-medium text-text-secondary',
  button: 'text-[17px] leading-[22px] font-semibold text-text-primary',
};

export function ThemedText({
  variant = 'body',
  color,
  style,
  className = '',
  children,
  ...props
}: ThemedTextProps) {
  return (
    <Text
      className={`${variantClasses[variant]} ${className}`}
      style={[color ? { color } : undefined, style]}
      {...props}
    >
      {children}
    </Text>
  );
}
