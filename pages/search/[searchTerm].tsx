import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";
import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";
import { IUser, Video } from "../../types";
import Image from "next/image";


const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const {allUsers} = useAuthStore();

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
        >
          Accounts
        </p>
        <p
          onClick={() => setIsAccounts(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
            {searchedAccounts.length > 0 ? (
                searchedAccounts.map((user: IUser) => (
                    <Link key={user._id} href={`/profile/${user._id}`}>
                       <div className="flex p-2 font-semibold rounded border-b-2 gap-3 cursor-pointer">
                            <div>
                              <Image
                                src={user.image}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="user profile"
                              />
                            </div>
                            <div className="hidden xl:block">
                              <p className="flex gap-1 items-center font-bold text-primary lowercase">
                                {user.userName.replaceAll(" ", "")}
                                <GoVerified className="text-blue-400" />
                              </p>
                              <p className="capitalize text-xs text-gray-400">
                                {user.userName}
                              </p>
                            </div>
                       </div>
                      </Link>
                ))
            ) : (
                <NoResults text={`No user results for ${searchTerm}`} />
            )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
            {videos.length ? (
                videos.map((video: Video, idx) => (
                    <VideoCard post={video} key={idx}/>
                ))
            ) : (
                <NoResults text={`No video results for ${searchTerm}`} />
            )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;
