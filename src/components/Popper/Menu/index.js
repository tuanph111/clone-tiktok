import classNames from 'classnames/bind';
import styles from '~/components/Popper/Menu/Menu.module.scss';

import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

import { useState } from 'react';

const cx = classNames.bind(styles);

function Menu({ children, items }) {
    const [history, setHistory] = useState([{ data: items }]);
    const currrentItems = history[history.length - 1];

    const renderItems = () => {
        return currrentItems.data.map((item, index) => {
            const hasChildren = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (hasChildren) {
                            console.log(item.children);
                            setHistory((prev) => [...prev, item.children]);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            interactive
            delay={[0, 700]}
            placement="bottom-end"
            onHidden={() => {
                setHistory((prev) => prev.slice(0, 1));
            }}
            render={(attrs) => (
                <div className={cx('memu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {!!currrentItems.title && (
                            <Header
                                title={currrentItems.title}
                                onBack={() => {
                                    setHistory(history.slice(0, history.length - 1));
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
