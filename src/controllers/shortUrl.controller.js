
import shortid from "shortid";
import { Url } from "../models/url.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const shortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      throw new ApiError(400, "Original url is required");
    }


    const isUrlExist = await Url.findOne({ originalUrl });

    // if url already exist
    if (isUrlExist) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, { originalUrl, shortUrl: isUrlExist.shortUrl })
        );
    }


    // if url doest not exist

    const shortUrl = shortid.generate();
    const url = new Url({ originalUrl, shortUrl });
    await url.save();
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          { originalUrl, shortUrl },
          "short url created successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
};



const getOriginalUrl = async(req, res)=> {
    try {
        const {shortUrl} = req.params;
        
        if(!shortUrl) {
            throw new ApiError(400, 'shortUrl is required');
        }
        
        const url = await Url.findOne({shortUrl});

        if(!url) {
            throw new ApiError(404, 'Url not found');
        }
         
        res.status(200)
        .json(new ApiResponse(200, url.originalUrl));
        
    } catch (error) {
        throw new ApiError(500, 'Internal server error');
    }
   
}

export { shortUrl, getOriginalUrl };
