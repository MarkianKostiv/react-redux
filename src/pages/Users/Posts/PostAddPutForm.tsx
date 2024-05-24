import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import { FormDataProp } from "../../../interfaces/PostAddPutForm/FormDataProp";
import { PostAddProps } from "../../../interfaces/PostAddPutForm/PostAddProps";
import { RootState, AppDispatch } from "../../../state/store";
import { fetchPostById } from "../../../state/posts/postsSlice";

const PostAdd: React.FC<PostAddProps> = ({ requestType, initialValues }) => {
  const { userId, postId } = useParams<{ userId?: string; postId?: string }>();
  const dispatch: AppDispatch = useDispatch();
  const post = useSelector((state: RootState) =>
    state.posts.posts.find((p) => p.id === Number(postId))
  );
  const [formInitialValues, setFormInitialValues] =
    useState<FormDataProp>(initialValues);

  useEffect(() => {
    if (requestType === "PUT" && postId) {
      if (!post) {
        dispatch(fetchPostById(postId));
      } else {
        const updatedValues: FormDataProp = {
          userId: post.userId,
          id: postId,
          title: post.title,
          body: post.body,
        };
        setFormInitialValues(updatedValues);
      }
    }
  }, [requestType, postId, post, dispatch]);

  useEffect(() => {
    if (requestType === "PUT" && post) {
      const updatedValues: FormDataProp = {
        userId: post.userId,
        id: postId,
        title: post.title,
        body: post.body,
      };
      setFormInitialValues(updatedValues);
    }
  }, [post, requestType, postId]);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(30, "Title must be 30 characters or less")
      .required("Title is required"),
    body: Yup.string()
      .min(5, "Body must be at least 5 characters")
      .required("Body is required"),
  });

  const onSubmit = (
    data: FormDataProp,
    { resetForm }: FormikHelpers<FormDataProp>
  ) => {
    const url =
      requestType === "POST"
        ? "https://jsonplaceholder.typicode.com/posts"
        : `https://jsonplaceholder.typicode.com/posts/${postId}`;

    axios[requestType.toLowerCase() as "post" | "put"](url, {
      ...data,
      userId: Number(userId),
    })
      .then((response) => {
        console.log("Response from server: ", response.data);
        toast.success(
          `Post ${requestType === "POST" ? "added" : "updated"} successfully!`
        );
        if (requestType === "POST") resetForm();
      })
      .catch((error) => {
        console.error("There was an error submitting the form: ", error);
        toast.error(
          `Post ${
            requestType === "POST" ? "adding" : "updating"
          } failed. Please try again.`
        );
      });
    console.log(data);
  };

  return (
    <div className='w-full flex flex-col pt-8 pb-8 pl-10 pr-10'>
      <div className='w-full flex justify-between mb-8'>
        <h2 className='font-semibold text-xl'>
          {requestType === "POST" ? "Add New Post" : "Update Post"}
        </h2>
        <Link
          to={
            requestType === "POST"
              ? `/user/posts/${userId}`
              : `/post/details/${postId}`
          }
        >
          <button
            className={`font-semibold text-xl 
          pt-4 pb-4 pr-6 pl-6 
          bg-[#F58E8E] hover:bg-[#f45858] 
          duration-300 rounded-xl transform active:scale-95 
          active:bg-[#f6cbcb] focus:outline-none shadow-md hover:shadow-lg active:shadow-none`}
          >
            X
          </button>
        </Link>
      </div>
      <ToastContainer />
      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='flex flex-col w-full gap-5'>
          <label className='flex flex-col text-xl font-normal'>
            Title:
            <Field
              name='title'
              placeholder='Post title'
              className='p-4 rounded-md'
            />
            <ErrorMessage
              className='text-red-500 text-sm mt-1'
              name='title'
              component='span'
            />
          </label>
          <label className='flex flex-col text-xl font-normal'>
            Body:
            <Field
              name='body'
              as='textarea'
              rows='5'
              placeholder='Post body'
              className='resize-none p-4 rounded-md'
            />
            <ErrorMessage
              name='body'
              component='span'
              className='text-red-500 text-sm mt-1'
            />
          </label>
          <button
            type='submit'
            className={`font-semibold text-xl pt-4 pb-4 pr-6 pl-6 
            bg-[#009C2F] hover:bg-[#339039] 
            duration-300 rounded-xl transform active:scale-95 
            active:bg-[#007B2C] focus:outline-none shadow-md hover:shadow-lg active:shadow-none`}
          >
            {requestType === "POST" ? "Add" : "Update"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default PostAdd;
