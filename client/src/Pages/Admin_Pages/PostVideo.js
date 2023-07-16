import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { SlPlus } from "react-icons/sl";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { RiImageAddLine } from "react-icons/ri";
import AdminSideBar from "../../Components/User/AdminSideBar";
import { MdOndemandVideo } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ClearErrors, postVideoAction } from "../../Actions/VideosAction";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const PostVideo = () => {
  const ThumbnailInputRef = useRef(null);
  const CoverInputRef = useRef(null);
  const VideoInputRef = useRef(null);

  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const { loading, isPosted, error } = useSelector((state) => state.postVideo);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }
    if (isPosted) {
      toast.success("Video Posted Successfully");
      dispatch({ type: "PostVideoReset" });
      naviagte("/admin/dashboard");
    }
  }, [error, dispatch, isPosted, naviagte]);

  const videoEl = useRef(null);

  return (
    <div className="flex justify-between items-center w-full lg:h-[330vh]">
      {/* sidebar */}
      <div className="w-0 md:w-[20%] h-full overflow-hidden">
        <AdminSideBar />
      </div>
      {loading ? (
        <Loader msg="Posting Video, Please wait..." />
      ) : (
        <div className="w-full lg:w-[80%] h-full  bg-cyan-900 text-white p-10 lg:p-16 py-20 px-5">
          <Formik
            initialValues={{
              title: "Sample",
              synopsis: "Sample",
              tagName: "Sample",
              tags: ["1", "2", "3"],
              speciality_Name: "Sample",
              speciality_In: ["1", "2", "3"],
              video_quality: "HD",
              censor_ratings: "A",
              audio_language: "English",
              thumbnail: "",
              cover_page: "",
              thumbnail_preview: "",
              cover_page_preview: "",
              File: {},
              video_Preview: "",
              hours: "",
              minutes: "",
            }}
            onSubmit={(values) => {
              console.log({ values });

              var myForm = new FormData();

              myForm.set("title", values.title);
              myForm.set("synopsis", values.synopsis);

              myForm.set("tags", values.tags);
              myForm.set("speciality_In", values.speciality_In);

              myForm.set("video_quality", values.video_quality);
              myForm.set("censor_ratings", values.censor_ratings);
              myForm.set("audio_language", values.audio_language);

              myForm.set("hours", values.hours);
              myForm.set("minutes", values.minutes);

              myForm.set("thumbnail", values.thumbnail);
              myForm.set("cover_page", values.cover_page);

              myForm.set("videoFile", values.video);

              // console.log({ values });

              dispatch(postVideoAction(myForm));
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                {/* Details */}
                <h1 className="text-[1.3rem] font-semibold">Details*</h1>

                <div className="bg-gray-200 text-black my-5 p-5 mt-3 w-full rounded-md shadow-md">
                  {/* title */}

                  <div className="w-full flex flex-col justify-between items-start mb-5">
                    <label className="font-semibold pb-1">Title*</label>
                    <Field
                      as="textarea"
                      name="title"
                      cols="100"
                      rows="2"
                      className="p-2 w-[70%] rounded-md border-[1px] border-black outline-none text-[0.9rem]"
                      placeholder="Enter Title"
                    />
                  </div>

                  {/* synopsis */}
                  <div className="w-full flex flex-col justify-between items-start mb-5">
                    <label className="font-semibold pb-1">Description*</label>
                    <Field
                      as="textarea"
                      name="synopsis"
                      cols="120"
                      rows="5"
                      className="p-2 w-[90%] rounded-md border-[1px] border-black outline-none text-[0.9rem]"
                      placeholder="Enter Description"
                    />
                  </div>

                  {/* tags */}
                  <div className="w-full flex flex-col justify-between items-start mb-5">
                    <label className="font-semibold pb-1">Tags*</label>

                    <span className="flex justify-start items-center w-full">
                      <Field
                        name="tagName"
                        type="text"
                        className="text-[0.9rem] w-[70%] p-2 border-2 border-gray-400 rounded-md outline-none"
                        placeholder="Enter Tags"
                      />
                      <SlPlus
                        className="ml-5 text-[1.5rem] text-green-600 cursor-pointer rounded-full bg-green-200"
                        onClick={() => {
                          if (values.tagName) {
                            values.tags.push(values.tagName);
                            setFieldValue("tagName", "");
                          }
                        }}
                      />
                    </span>

                    {values.tags.length > 0 && (
                      <div className="overflow-y-scroll mt-3 w-[85%] h-[20vh] flex justify-start items-start flex-wrap bg-gray-300 rounded-md p-2">
                        {values.tags.map((item, index) => {
                          return (
                            <span
                              key={index}
                              className="m-2 font-medium whitespace-nowrap bg-zinc-400 rounded-md p-2 flex justify-start items-center text-[0.8rem]"
                            >
                              {item}
                              <RxCross2
                                className="ml-2 text-[1.1rem] font-bold cursor-pointer text-red-600"
                                onClick={() => {
                                  let arr = values.tags.filter(
                                    (SingleTag) => SingleTag !== item
                                  );

                                  setFieldValue("tags", arr);
                                }}
                              />
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Speciality */}
                  <div className="w-full flex flex-col justify-between items-start mb-5">
                    <label className="font-semibold pb-1">Speciality*</label>

                    <span className="flex justify-start items-center w-full">
                      <Field
                        name="speciality_Name"
                        type="text"
                        className="text-[0.9rem] w-[70%] p-2 border-2 border-gray-400 rounded-md outline-none"
                        placeholder="Enter Speciality"
                      />
                      <SlPlus
                        className="ml-5 text-[1.5rem] text-green-600 cursor-pointer rounded-full bg-green-200"
                        onClick={() => {
                          if (values.speciality_Name) {
                            values.speciality_In.push(values.speciality_Name);
                            setFieldValue("speciality_Name", "");
                          }
                        }}
                      />
                    </span>

                    {values.speciality_In.length > 0 && (
                      <div className="overflow-y-scroll mt-3 w-[85%] h-[20vh] flex justify-start items-start flex-wrap bg-gray-300 rounded-md p-2">
                        {values.speciality_In.map((item, index) => {
                          return (
                            <span
                              key={index}
                              className="m-2 font-medium whitespace-nowrap bg-zinc-400 rounded-md p-2 flex justify-start items-center text-[0.8rem]"
                            >
                              {item}
                              <RxCross2
                                className="ml-2 text-[1.1rem] font-bold cursor-pointer text-red-600"
                                onClick={() => {
                                  let arr = values.speciality_In.filter(
                                    (SingleSpeciality) =>
                                      SingleSpeciality !== item
                                  );

                                  setFieldValue("speciality_In", arr);
                                }}
                              />
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Censorship */}
                  <div className="w-full flex justify-start items-center mb-5">
                    <label className="font-semibold pr-2">Censorship : </label>

                    <Field
                      as="select"
                      name="censor_ratings"
                      className="text-[0.9rem] p-1 outline-none rounded-md "
                    >
                      <option value="">Enter the censor ratings</option>
                      <option value="U/A 13+">U/A 13+</option>
                      <option value="U/A 16+">U/A 16+</option>
                      <option value="18+">18+</option>
                      <option value="A">A</option>
                    </Field>
                  </div>

                  {/* video quality */}
                  <div className="w-full flex justify-start items-center mb-5">
                    <label className="font-semibold pr-2">
                      Video Quality :{" "}
                    </label>

                    <Field
                      as="select"
                      name="video_quality"
                      className="text-[0.9rem] p-1 outline-none rounded-md "
                    >
                      <option value="">Enter the Video Quality</option>
                      <option value="SD">SD</option>
                      <option value="HD">HD</option>
                      <option value="4k">4k</option>
                    </Field>
                  </div>

                  {/* video Language */}
                  <div className="w-full flex justify-start items-center mb-5">
                    <label className="font-semibold pr-2">
                      Video Language :
                    </label>

                    <Field
                      as="select"
                      name="audio_language"
                      className="text-[0.9rem] p-1 outline-none rounded-md "
                    >
                      <option value="">Enter the Audio Language</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Japanese">Japanese</option>
                    </Field>
                  </div>
                </div>

                {/* Images */}
                <div className="w-full h-full flex lg:flex-row flex-col justify-between items-center">
                  {/* Thumbnail */}
                  <div className="w-full lg:w-[35%] h-full flex flex-col justify-between items-start">
                    <h1 className="text-[1.3rem] font-semibold">Thumbnail*</h1>
                    <div className="w-full h-[40vh] bg-gray-100 text-black my-5 p-5 mt-3 rounded-md shadow-md">
                      {values.thumbnail_preview ? (
                        <div className="relative flex justify-center items-center w-full h-full  border-[2px] border-gray-400 border-dashed p-1 rounded-md">
                          <img
                            src={values.thumbnail_preview}
                            alt="thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <button
                            className="absolute bottom-2 right-2 text-[1.2rem] p-2 bg-red-400 text-red-700 rounded-md"
                            onClick={() =>
                              setFieldValue("thumbnail_preview", "")
                            }
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => ThumbnailInputRef.current.click()}
                          className="w-full h-full  cursor-pointer rounded-md overflow-hidden  p-5 border-[2px] border-gray-400 border-dashed text-zinc-500  flex flex-col justify-center items-center"
                        >
                          <RiImageAddLine className="text-[3rem] p-1" />
                          <p className="text-[0.9rem] font-bold ">
                            Upload Thumbnail
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            ref={ThumbnailInputRef}
                            onChange={(event) => {
                              console.log("thumbnail changed");
                              const reader = new FileReader();

                              reader.onload = () => {
                                if (reader.readyState === 2) {
                                  setFieldValue(
                                    "thumbnail_preview",
                                    reader.result
                                  );
                                }
                              };
                              reader.readAsDataURL(event.target.files[0]);
                              setFieldValue("thumbnail", event.target.files[0]);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Cover Photo */}
                  <div className="w-full lg:w-[60%] h-full flex flex-col justify-between items-start">
                    <h1 className="text-[1.3rem] font-semibold">
                      Cover Photo*
                    </h1>
                    <div className="w-full h-[40vh] bg-gray-100 text-black my-5 p-5 mt-3 rounded-md shadow-md">
                      {values.cover_page_preview ? (
                        <div className="relative flex justify-center items-center w-full h-full  border-[2px] border-gray-400 border-dashed p-1 rounded-md">
                          <img
                            src={values.cover_page_preview}
                            alt="cover_page"
                            className="w-full h-full object-cover"
                          />
                          <button
                            className="absolute bottom-2 right-2 text-[1.2rem] p-2 bg-red-400 text-red-700 rounded-md"
                            onClick={() =>
                              setFieldValue("cover_page_preview", "")
                            }
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ) : (
                        <div
                          className="w-full h-full  cursor-pointer rounded-md overflow-hidden border-[2px] p-5 border-gray-400 text-zinc-500 border-dashed flex flex-col justify-center items-center"
                          onClick={() => CoverInputRef.current.click()}
                        >
                          <RiImageAddLine className="text-[3rem] p-1" />
                          <p className="text-[0.9rem] font-bold ">
                            Upload Cover Photo
                          </p>

                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            ref={CoverInputRef}
                            onChange={(event) => {
                              console.log("Cover changed");
                              const reader = new FileReader();

                              reader.onload = () => {
                                if (reader.readyState === 2) {
                                  setFieldValue(
                                    "cover_page_preview",
                                    reader.result
                                  );
                                }
                              };
                              reader.readAsDataURL(event.target.files[0]);
                              setFieldValue(
                                "cover_page",
                                event.target.files[0]
                              );
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Videos */}
                <h1 className="text-[1.3rem] font-semibold">Upload Video*</h1>
                <div className="w-full h-[70vh] bg-gray-100 text-black my-5 p-5 mt-3 rounded-md shadow-md">
                  {values.video_Preview ? (
                    <div className="w-full h-full relative">
                      <RxCross1
                        className="absolute top-2 right-2 text-[2rem] font-semibold rounded-full p-1 text-white bg-red-600 shadow-md cursor-pointer z-10"
                        onClick={() => {
                          setFieldValue("video_Preview", "");
                          setFieldValue("video", "");
                        }}
                      />
                      <video
                        src={values.video_Preview}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                        ref={videoEl}
                        onLoadedMetadata={() => {
                          const video = videoEl.current;

                          if (!video) {
                            setFieldValue("hours", "");
                            setFieldValue("minutes", "");
                            return;
                          }

                          let duration = Math.round(video.duration);
                          let minutes = Math.round(duration / 60);
                          let hours = Math.round(duration / 3600);

                          setFieldValue("hours", hours);
                          setFieldValue("minutes", minutes);

                          // console.log(
                          //   `The video is ${hours} hrs ${minutes} mins long.`
                          // );
                        }}
                      ></video>
                    </div>
                  ) : (
                    <div
                      onClick={() => VideoInputRef.current.click()}
                      className="w-full h-full  cursor-pointer rounded-md overflow-hidden border-[2px] p-5 border-gray-400 text-zinc-500 border-dashed flex flex-col justify-center items-center"
                    >
                      <MdOndemandVideo className="text-[3rem] p-1" />
                      <p className="text-[0.9rem] font-bold ">Upload Video</p>
                      <input
                        hidden
                        type="file"
                        accept=".mp4, .mkv"
                        ref={VideoInputRef}
                        onChange={(event) => {
                          console.log("Video changed");

                          const reader = new FileReader();

                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setFieldValue("video_Preview", reader.result);
                            }
                          };
                          reader.readAsDataURL(event.target.files[0]);
                          setFieldValue("video", event.target.files[0]);
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end items-center p-2">
                  {/* reset button*/}
                  <span
                    className="cursor-pointer mx-5 py-2 px-3 rounded-md bg-white hover:bg-gray-200 text-red-600 shadow-md duration-150"
                    onClick={() => {
                      setFieldValue("title", "");
                      setFieldValue("synopsis", "");
                      setFieldValue("tagName", "");
                      setFieldValue("tags", []);
                      setFieldValue("speciality_Name", "");
                      setFieldValue("speciality_In", []);
                      setFieldValue("video_quality", "");
                      setFieldValue("audio_language", "");
                      setFieldValue("censor_ratings", "");
                      setFieldValue("thumbnail", "");
                      setFieldValue("cover_page", "");
                      setFieldValue("video", []);
                      setFieldValue("video_Preview", "");
                    }}
                  >
                    Reset
                  </span>

                  {/* submit button*/}
                  <button
                    type="submit"
                    className="ml-5 py-2 px-3 rounded-md bg-green-600 hover:bg-green-500 text-white shadow-md duration-150"
                  >
                    Post Video
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default PostVideo;

export const TagName = ({ name }) => {
  return 132;
};
