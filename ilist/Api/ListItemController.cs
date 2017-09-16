using iList.Data.Providers;
using iList.Models.Requests;
using iList.Models.Responses;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace iList.Api
{
    public class ListItemController : ApiController
    {
        private IListItemProvider _provider;
        public IListItemProvider Provider
        {
            get { return _provider ?? (_provider = new ListItemProvider()); }
            set { _provider = value; }
        }

        public async Task<GetListItemsResponse> GetAll()
        {
            var response = new GetListItemsResponse();

            try
            {
                response.Items.AddRange(await Provider.GetListItems());
            }
            catch (Exception ex)
            {
                response.IsError = true;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<GetListItemByIdResponse> Get(Guid id)
        {
            var response = new GetListItemByIdResponse();

            try
            {
                response.Item = await Provider.GetListItemById(id);
            }
            catch (Exception ex)
            {
                response.IsError = true;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<DeleteListItemResponse> Delete(Guid id)
        {
            var response = new DeleteListItemResponse();

            try
            {
                response.IsSuccess = await Provider.DeleteListItemById(id);
            }
            catch (Exception ex)
            {
                response.IsError = true;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<UpdateListItemResponse> Put(UpdateListItemRequest request)
        {
            var response = new UpdateListItemResponse();

            try
            {
                response.Item = await Provider.UpdateListItem(request.Item);
            }
            catch (Exception ex)
            {
                response.IsError = true;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<CreateListItemResponse> Post(CreateListItemRequest request)
        {
            var response = new CreateListItemResponse();

            try
            {
                response.Item = await Provider.InsertListItem(request.Text);
            }
            catch (Exception ex)
            {
                response.IsError = true;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}
