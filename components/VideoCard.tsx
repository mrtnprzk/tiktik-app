import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { Video } from '../types';

interface IProps {
    post: Video;
}

const VideoCard = ({post}: IProps) => {
    const [isHover, setIsHover] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const onVideoPress = () => {
        if (playing) {
            videoRef.current?.pause();
            setPlaying(false);
        } else {
            videoRef.current?.play();
            setPlaying(true);
        }
    }

    useEffect(() => {
      if (videoRef?.current) {
        videoRef.current.muted = isVideoMuted;
      }
    }, [isVideoMuted])
    
    
  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
        <div>
            <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
                <div className='md:w-16 md:h-16 w-10 h-10'>
                    <Link href={`profile/${post.postedBy._id}`}>
                        <Image width={62} height={62} src={post.postedBy.image} alt='profile photo' layout='responsive' className='rounded-full'/>
                    </Link>
                </div>
                <div>
                    <Link href={`profile/${post.postedBy._id}`}>
                        <div className='flex items-center gap-2'>
                            <p className='flex gap-2 items-center md:text-lg font-bold text-primary'>{post.postedBy.userName} {' '} <GoVerified className='text-blue-400 text-sm'/></p>
                            <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{post.postedBy.userName}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        <div className='lg:ml-20 flex gap-4 relative'>
            <div className='rounded-3xl ' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <Link href={`/detail/${post._id}`}>
                    <video 
                        ref={videoRef}
                        loop 
                        className='cursor-pointer bg-gray-100 w-[300px] md:w-[400px] lg:w-[530px] xl:w-[600px]' 
                        src={post.video.asset.url}
                    />
                </Link>
                {isHover && (
                    <div className='absolute bottom-6 flex justify-center cursor-pointer p-3 space-x-10 w-[300px] md:w-[400px] lg:w-[530px] xl:w-[600px]'>
                        {playing ? (
                            <button onClick={onVideoPress}>
                                <BsFillPauseFill className='text-[#F51997] text-2xl lg:text-4xl'/>
                            </button>
                        ) : (
                            <button onClick={onVideoPress}>
                                <BsFillPlayFill className='text-[#F51997] text-2xl lg:text-4xl'/>
                            </button>
                        )}
                        {isVideoMuted ? (
                            <button onClick={() => setIsVideoMuted(false)}>
                                <HiVolumeOff className='text-[#F51997] text-2xl lg:text-4xl'/>
                            </button>
                        ) : (
                            <button onClick={() => setIsVideoMuted(true)}>
                                <HiVolumeUp className='text-[#F51997] text-2xl lg:text-4xl'/>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default VideoCard