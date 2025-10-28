function PostCard(props){
  const {title, date} = props;
  return(
    <div>
      <h2>{title}</h2>
      <date>{date}</date>
    </div>
  );
}

export default PostCard