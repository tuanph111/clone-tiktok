import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    className,
    children,
    leftIcon,
    rightIcon,
    to,
    href,
    retangle = false,
    primary = false,
    outline = false,
    bounded = false,
    small = false,
    large = false,
    onClick,
    ...passProps
}) {
    let Component = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        Component = Link;
        props.to = to;
    }

    if (href) {
        Component = 'a';
        props.href = href;
    }

    const classes = cx('wrapper', {
        [className]: className,
        retangle,
        primary,
        outline,
        bounded,
        small,
        large,
    });

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('content')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Component>
    );
}

export default Button;
