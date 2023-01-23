export interface IButtonProps {
    icon        ?: React.ReactNode;
    shape       : "round" | "circle" | "default";
    onClick     ?: () => any;
    content     ?: string;
}