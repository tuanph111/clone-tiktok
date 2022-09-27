import { useEffect, useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import * as service from '~/services/searchService';
import { useDebounce } from '~/hooks';

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResults([]);
            return;
        }
        (async () => {
            setIsLoading(true);
            const res = await service.searchService(debounced);
            setSearchResults(res.data);
            setIsLoading(false);
        })();
    }, [debounced]);

    const inputRef = useRef();

    const handleSearch = (e) => {
        setSearchValue(e.target.value.trim());
    };
    const handleClear = () => {
        setSearchValue('');
        setSearchResults([]);
        inputRef.current.focus();
    };
    return (
        <HeadlessTippy
            interactive
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResults.map((data) => {
                            return <AccountItem key={data.id} data={data} />;
                        })}
                    </PopperWrapper>
                </div>
            )}
            visible={showSearchResults && searchResults.length > 0}
            onClickOutside={() => setShowSearchResults(false)}
        >
            <div className={cx('search')}>
                <input
                    placeholder="Search accounts and videos"
                    type={'text'}
                    value={searchValue}
                    onChange={handleSearch}
                    onFocus={() => setShowSearchResults(true)}
                    ref={inputRef}
                />
                {!isLoading && !!searchValue && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {isLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
