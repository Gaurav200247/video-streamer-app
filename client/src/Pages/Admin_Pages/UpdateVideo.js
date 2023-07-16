import React, { useEffect, useRef } from "react";
// import AdminSideBar from "../../Components/User/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearErrors,
  getSingleVideoDetails,
  updateVideoAction,
} from "../../Actions/VideosAction";
import { useNavigate, useParams } from "react-router-dom";
import { Field, Formik, Form } from "formik";
// import { TagName } from "./PostVideo";
import { SlPlus } from "react-icons/sl";
import { FaTrash } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";

const UpdateVideo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { video } = useSelector((state) => state.getSingleVideoDetails);
  const { loading, isUpdated, updateError } = useSelector(
    (state) => state.UpdateDeleteVideos
  );

  const { id } = useParams();
  const ThumbnailInputRef = useRef(null);
  const CoverInputRef = useRef(null);

  useEffect(() => {
    dispatch(getSingleVideoDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
      dispatch(ClearErrors());
    }
    if (isUpdated) {
      toast.success("Video Updated Successfully");
      dispatch({ type: "UpdateVideoReset" });
      navigate("/admin/dashboard");
    }
  }, [updateError, dispatch, isUpdated, navigate]);

  return loading ? (
    <Loader msg="Updating Video, Please wait..." />
  ) : (
    <div className="flex justify-between items-center w-full lg:h-[330vh]">
      <div className="w-full  h-full  bg-indigo-900 text-white p-10 lg:p-20 py-20 px-5">
        {video && video.success && (
          <Formik
            initialValues={{
              title: video.video.title,
              synopsis: video.video.synopsis,

              tagName: "",
              tags: video.video.tags.length > 0 && video.video.tags,

              speciality_Name: "",
              speciality_In:
                video.video.speciality_In.length > 0 &&
                video.video.speciality_In,

              video_quality: video.video.video_quality,
              censor_ratings: video.video.censor_ratings,
              audio_language: video.video.audio_language,

              featured: video.video.featured,

              hours: video.video.video_length.hours,
              minutes: video.video.video_length.minutes,

              thumbnail: "",
              thumbnail_preview:
                (video &&
                  video.video &&
                  video.video.thumbnail &&
                  video.video.thumbnail.ThumbnailURL) ||
                "not_loaded",
              cover_page: "",
              cover_page_preview:
                (video &&
                  video.video &&
                  video.video.cover_page &&
                  video.video.cover_page.CoverPageURL) ||
                "not_loaded",
            }}
            onSubmit={(values) => {
              console.log({ values });

              var myForm = new FormData();

              myForm.set("title", values.title);
              myForm.set("synopsis", values.synopsis);

              myForm.set("tags", values.tags);
              myForm.set("speciality_In", values.speciality_In);
              myForm.set("featured", values.featured);

              myForm.set("video_quality", values.video_quality);
              myForm.set("censor_ratings", values.censor_ratings);
              myForm.set("audio_language", values.audio_language);

              myForm.set("hours", values.hours);
              myForm.set("minutes", values.minutes);

              values.thumbnail && myForm.set("thumbnail", values.thumbnail);
              values.cover_page && myForm.set("cover_page", values.cover_page);

              console.log({ values });

              dispatch(updateVideoAction(myForm, id));
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                {/*------------------------ Details ------------------------ */}
                <h1 className="text-[1.3rem] font-semibold">Update Details</h1>

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
                            // values.tags.push(values.tagName);
                            values.tags = [...values.tags, values.tagName];
                            // console.log(list);
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
                            values.speciality_In = [
                              ...values.speciality_In,
                              values.speciality_Name,
                            ];
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
                                    (SpecialityTag) => SpecialityTag !== item
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

                  {/* featured */}
                  <div className="w-full flex justify-start items-center mb-5">
                    <label className="font-semibold pr-2">Featured :</label>

                    <Field
                      as="select"
                      name="featured"
                      className="text-[0.9rem] p-1 outline-none rounded-md "
                    >
                      <option value="false">False</option>
                      <option value="true">True</option>
                    </Field>
                  </div>
                </div>

                {/* ------------------------ Images ------------------------ */}

                {/* Images */}
                <div className="w-full h-full flex lg:flex-row flex-col justify-between items-center">
                  {/* ------------------------Thumbnail ------------------------*/}
                  <div className="w-full lg:w-[35%] h-full flex flex-col justify-between items-start">
                    <h1 className="text-[1.3rem] font-semibold">Thumbnail*</h1>

                    {/* ------------------------Thumbnail CONTAINER ------------------------*/}
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

                              console.log("thumbnail changed");
                            }}
                          />
                        </div>
                      )}
                    </div>
                    {/* ------------------------Thumbnail CONTAINER Closed------------------------*/}
                  </div>
                  {/* ------------------------ Cover Photo ------------------------*/}
                  <div className="w-full lg:w-[60%] h-full flex flex-col justify-between items-start">
                    <h1 className="text-[1.3rem] font-semibold">
                      Cover Photo*
                    </h1>
                    {/* ------------------------ Cover Photo CONTAINER------------------------*/}
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
                    {/* ------------------------ Cover Photo CONTAINER Closed------------------------*/}
                  </div>
                </div>

                {/* ------------------------ Buttons ------------------------*/}
                <div className="flex justify-end items-center p-2">
                  {/* submit button*/}
                  <button
                    type="submit"
                    className="ml-5 py-2 px-3 rounded-md bg-green-600 hover:bg-green-500 text-white shadow-md duration-150"
                  >
                    Update Video
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default UpdateVideo;
