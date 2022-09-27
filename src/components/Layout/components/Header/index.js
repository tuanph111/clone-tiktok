import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEllipsisVertical,
    faGlobe,
    faCircleQuestion,
    faKeyboard,
    faCoins,
    faGear,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faMessage, faPaperPlane, faUser } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import images from '~/assets/images';
import { Menu as MenuPopper } from '~/components/Popper';
import Search from '../Search';
import Button from '~/components/Button';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faGlobe} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'zh',
                    title: '中文',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and support',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

export default function Header() {
    const currentUser = true;

    const userItems = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
            to: '/profile',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get Coins',
            to: '/coins',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Tik tok" />
                </div>
                <Search />
                <div className={cx('actions')}>
                    <Button retangle leftIcon={<FontAwesomeIcon icon={faPlus} />} to={'/upload'}>
                        Upload
                    </Button>
                    {currentUser ? (
                        <>
                            <Tippy content="Messages">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faMessage} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <MenuPopper items={currentUser ? userItems : MENU_ITEMS}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/53036b5eb08594c33a73a28b5d384360~c5_100x100.jpeg?x-expires=1663826400&x-signature=YABwaEZ7lbjDYM4q6kchH7vKhM8%3D"
                                alt="avatar"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </MenuPopper>
                </div>
            </div>
        </header>
    );
}
