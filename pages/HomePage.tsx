'use client';

import { useEffect, useState } from 'react';
import { DataTable, Spinner } from '@/components/DataTable';
import useUser from '@/hooks/useUser';
import { PagingUserRequest } from '@/models/user.model';
import { ListUser, User } from '@/type/user.type';
import { getAddress, getCompany, getFullName } from '@/utils/func';
import { getUSer } from '@/apis/user.api';
import Image from 'next/image';

export const HomePage = () => {
  const { listUser: data, isLoading, handlePagingUser } = useUser();

  const [pageIndex, setPageIndex] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [isLoadingCurrent, setIsLoadingCurrent] = useState<boolean>(true);

  useEffect(() => {
    handlePagingUser(new PagingUserRequest((pageIndex - 1) * 10));
  }, [pageIndex]);

  useEffect(() => {
    if (!currentUser) handleGetUserDetails('1');
  }, []);

  const handleGetUserDetails = async (id: string) => {
    if (!isLoadingCurrent) setIsLoadingCurrent(true);
    try {
      const data = await getUSer(id);
      setCurrentUser(data);
    } finally {
      setIsLoadingCurrent(false);
    }
  };

  const renderInforItem = (children: React.ReactNode) => {
    return (
      <div className="lg:col-span-1 col-span-2">
        <p className="text-sm">{children}</p>
      </div>
    );
  };

  return (
    <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-6">
      <div className="lg:col-span-2 col-span-3">
        <h1 className="font-semibold text-2xl mb-5 text-slate-950 text-center">
          User Table
        </h1>
        <DataTable<User>
          rows={(data as ListUser)?.users}
          itemsPerPage={10}
          total={(data as ListUser)?.total}
          isLoading={isLoading}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          columns={[
            {
              key: 'id',
              header: 'No',
            },
            {
              key: 'firstName',
              header: 'Name',
              onClick: (item) => handleGetUserDetails(item.id),
              render: (item) => (
                <b className="underline">{getFullName(item)}</b>
              ),
            },

            {
              key: 'email',
              header: 'Email',
            },
            {
              key: 'company',
              header: 'Company',
              render: (item) => getCompany(item),
            },
            {
              key: 'company',
              header: 'Department',
              alignment: 'center',
              render: (item) => item.company.department,
            },
          ]}
        />
      </div>
      <div className="lg:col-span-1 col-span-3">
        <h1 className="font-semibold text-2xl mb-5 text-slate-950 text-center">
          User Information
        </h1>
        <section
          className="w-full max-w-full bg-white bg-clip-border drop-shadow-md px-5 overflow-auto py-6 px-5 relative"
          style={{ minHeight: '15rem' }}
        >
          {isLoadingCurrent && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(225, 225, 225, 0.6)' }}
            >
              <Spinner />
            </div>
          )}
          {currentUser && (
            <>
              <div className="flex justify-center">
                <Image
                  width={150}
                  height={150}
                  src={currentUser?.image as string}
                  alt="avatar-image"
                  loading="lazy"
                />
              </div>
              <h1 className="font-bold text-lg pb-3 text-center pt-4">
                {getFullName(currentUser)}
              </h1>
              <div className="grid grid-flow-row-dense grid-cols-2 gap-2 items-baseline">
                {renderInforItem(
                  <>
                    Age: <b>{currentUser.age} years old</b>
                  </>
                )}
                {renderInforItem(
                  <>
                    Email: <b>{currentUser.email}</b>{' '}
                  </>
                )}

                <div className="lg:col-span-1 col-span-2">
                  <p className="text-sm">Card:</p>
                  <p className="text-sm">
                    - Number: <b>{currentUser.bank.cardNumber}</b>
                  </p>
                  <p className="text-sm">
                    - Type: <b>{currentUser.bank.cardType}</b>
                  </p>
                  <p className="text-sm">
                    - Expire: <b>{currentUser.bank.cardExpire}</b>
                  </p>
                </div>

                <div className="lg:col-span-1 col-span-2">
                  <p className="text-sm">Company:</p>
                  <p className="text-sm">
                    - Name: <b>{currentUser.company.name}</b>
                  </p>
                  <p className="text-sm">
                    - Address: <b>{getAddress(currentUser.company.address)}</b>
                  </p>
                  <p className="text-sm">
                    - Department: <b>{currentUser.company.department}</b>
                  </p>
                </div>

                {renderInforItem(
                  <>
                    Address: <b>{getAddress(currentUser.address)}</b>
                  </>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};
