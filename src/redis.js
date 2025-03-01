const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on('connect',()=>console.log(`connected redis`))
redisClient.on('error',(err)=>console.log(`Error redis ${err}`))


function requestLimit(exp,threshold) {
  return  async(req,res,next) => {
    const ip =(req.headers['x-forwarded-for'] || req.socket.remoteAddress)?.slice(7)
    
    let timeLeft;
    const request = await redisClient.incr(ip)
    if(request===1){
      await redisClient.expire(ip,exp)
      timeLeft=exp
    }else{
      timeLeft = await redisClient.ttl(ip)
    }
  
    if(request>threshold){
      return res.status(503).json({message:`Exceeded request time limited,Wait till ${timeLeft} Sec`})
    }else {
      req.timeLeft = timeLeft
      req.attempt = (threshold-request)+1;
      next()
    }
  
  }
}

const cachedData = async (req,res,next) =>{
    const cache = await redisClient.get("cachedData");
   try {
    if(cache){
        return res.json({data:JSON.parse(cache),source:`redis you have ${req.attempt} left`})      
      }
      next()
   } catch (error) {
    console.error(err);
    return res.json({error:err,source:"redis"})      
   }

}
  
module.exports = {redisClient,requestLimit,cachedData};